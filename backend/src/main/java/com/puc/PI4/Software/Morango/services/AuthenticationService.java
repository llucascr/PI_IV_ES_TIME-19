package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.request.Authentication.AuthenticationRequest;
import com.puc.PI4.Software.Morango.dto.request.Authentication.RegisterResquest;
import com.puc.PI4.Software.Morango.dto.request.user.LoginResponse;
import com.puc.PI4.Software.Morango.dto.response.organization.InsertIntoOrganizationResponse;
import com.puc.PI4.Software.Morango.dto.response.user.UserRegisterResponse;
import com.puc.PI4.Software.Morango.exceptions.organization.OrganizationIsNotActive;
import com.puc.PI4.Software.Morango.exceptions.organization.OrganizationNotFound;
import com.puc.PI4.Software.Morango.exceptions.user.EmailInvaid;
import com.puc.PI4.Software.Morango.exceptions.user.UserAlreadyExist;
import com.puc.PI4.Software.Morango.exceptions.user.UserNotFound;
import com.puc.PI4.Software.Morango.infra.security.TokenService;
import com.puc.PI4.Software.Morango.models.Organization;
import com.puc.PI4.Software.Morango.models.User;
import com.puc.PI4.Software.Morango.repositories.OrganizationRepository;
import com.puc.PI4.Software.Morango.repositories.UserRepository;
import com.puc.PI4.Software.Morango.utils.SocketUtility;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class AuthenticationService {

    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;

    private final AuthenticationManager authenticationManager;
    private final TokenService tokenService;

    private final SocketUtility socketUtility;

    public LoginResponse login(AuthenticationRequest data) {
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.getEmail(), data.getPassword());
        var auth = this.authenticationManager.authenticate(usernamePassword);

        var user = (User) auth.getPrincipal();
        var token = tokenService.generateToken(user);

        return new LoginResponse(token, user.getName(), user.getIdOrganization(), user.getId());
    }

    public UserRegisterResponse register(RegisterResquest data) {
        if (this.userRepository.findByEmail(data.getEmail()) != null) throw new EmailInvaid("Error creating user");

        if (!socketUtility.validarEmail(data.getEmail())) throw new EmailInvaid("Error creating user, invalid email");

        if (userRepository.findByCpf(data.getCpf()).isPresent()) throw new UserAlreadyExist("CPF invalid");

        String ecryptedPassword = socketUtility.criptografarSenha(data.getPassword());
        String cpfFormatado = socketUtility.formatarCpf(data.getCpf());

        User user = User.builder()
                .id(UUID.randomUUID().toString())
                .name(data.getName())
                .email(data.getEmail())
                .password(ecryptedPassword)
                .cpf(cpfFormatado)
                .createAt(LocalDateTime.now())
                .active(true)
                .role(data.getRole())
                .build();

        userRepository.save(user);
        insertUserIntoOrganization(user.getEmail(), data.getOrganizationCnpj());

        return new UserRegisterResponse(user.getName(), "Usuário criado com sucesso!");
    }

    private void insertUserIntoOrganization(String employeeEmail, String organizationCnpj) {

        User user = userRepository.opFindByEmail(employeeEmail).orElseThrow(
                () -> new UserNotFound("User with email " + employeeEmail + " not found"));

        Organization organization = organizationRepository.findByCnpj(organizationCnpj).orElseThrow(
                () ->  new OrganizationNotFound("Organization with cnpj " + organizationCnpj + " not found"));

        if (organization.getActive() == false) {
            throw new OrganizationIsNotActive("Organization with CNPJ " + organizationCnpj + " is not active");
        }

        user.setIdOrganization(organization.getId());
        organization.setEmployees(user);

        userRepository.save(user);
        organizationRepository.save(organization);
    }

}
