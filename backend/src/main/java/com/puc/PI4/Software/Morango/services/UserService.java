package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.enums.RoleUser;
import com.puc.PI4.Software.Morango.dto.request.user.UserRequest;
import com.puc.PI4.Software.Morango.dto.response.organization.OrganizationResponse;
import com.puc.PI4.Software.Morango.dto.response.organization.UserAndOrganizationResponse;
import com.puc.PI4.Software.Morango.dto.response.user.UserResponse;
import com.puc.PI4.Software.Morango.exceptions.organization.OrganizationNotFound;
import com.puc.PI4.Software.Morango.exceptions.user.*;
import com.puc.PI4.Software.Morango.models.Organization;
import com.puc.PI4.Software.Morango.models.User;
import com.puc.PI4.Software.Morango.repositories.OrganizationRepository;
import com.puc.PI4.Software.Morango.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class UserService {

    private final ModelMapper modelMapper;
    private final UserRepository userRepository;
    private final OrganizationRepository organizationRepository;

    public UserResponse createUser(UserRequest userRequest) {

        User userAdmin = userRepository.findById(userRequest.getIdAdminUser()).orElseThrow(
                () -> new UserWithoutAdminPermission("User does not have permission 2222"));

        if (!userAdmin.getRole().equals(RoleUser.ADMIN)) {
            throw new UserWithoutAdminPermission("User does not have permission");
        }

        userRepository.findByEmail(userRequest.getEmail())
                .ifPresent(u -> {
                    throw new UserAlreadyExist("User with email " + userRequest.getEmail() + " already exist");
                });

        User user = User.builder()
                .id(UUID.randomUUID().toString())
                .name(userRequest.getName())
                .email(userRequest.getEmail())
                .password(userRequest.getPassword())
                .createAt(LocalDateTime.now())
                .active(true)
                .role(RoleUser.USER)
                .build();

        return modelMapper.map(userRepository.save(user), UserResponse.class);
    }

    public UserAndOrganizationResponse loginUser(String email, String password, String cnpj) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new UserNotFound("User with email " + email + " not found"));

        if (user.getActive() == false) {
            throw new UserIsNotActive("User with " + email + " is not active");
        }

        if (!user.getPassword().equals(password)) throw new IncorrectUserPassword("Password Incorrect");

        Organization organization = organizationRepository.findByCnpj(cnpj).orElseThrow(
                () -> new OrganizationNotFound("Organization with cnpj " + cnpj + " not found"));

        boolean isEmployye = organization.getEmployees().stream()
                .anyMatch(u -> u.getId().equals(user.getId()));

        if (!isEmployye) throw new UserNotInOrganization("User is not an employee of this organization");

        UserAndOrganizationResponse model = modelMapper.map(organization, UserAndOrganizationResponse.class);
        model.setUser(modelMapper.map(user, UserResponse.class));
        return model;
    }

    public UserResponse listUserById(String userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFound("User with id " + userId + " not found"));
        return modelMapper.map(user, UserResponse.class);
    }

    public Page<UserResponse> listAllUsers(int page, int numberOfUsers) {
        Pageable pageable = PageRequest.of(page, numberOfUsers);
        Page<User> users = userRepository.findAll(pageable);

        List<UserResponse> userResponses = users.getContent().stream()
                .map(user -> modelMapper.map(user, UserResponse.class))
                .toList();

        return new PageImpl<>(userResponses, pageable, users.getTotalElements());
    }

    public UserResponse updateUser(String userId, UserRequest userRequest) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new UserNotFound("User with email " + userRequest.getEmail() + " not found"));

        User userUpdated = User.builder()
                ._id(user.get_id())
                .id(user.getId())
                .name(userRequest.getName() != null ? userRequest.getName() : user.getName())
                .email(userRequest.getEmail() != null ? userRequest.getEmail() : user.getEmail())
                .password(userRequest.getPassword() != null ? userRequest.getPassword() : user.getPassword())
                .createAt(user.getCreateAt())
                .updateAt(LocalDateTime.now())
                .active(user.getActive())
                .build();

        return modelMapper.map(userRepository.save(userUpdated), UserResponse.class);
    }

}
