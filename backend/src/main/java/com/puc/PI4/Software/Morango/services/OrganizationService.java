package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.request.organization.OrganizationRequest;
import com.puc.PI4.Software.Morango.dto.response.organization.EmployeesOrganizationResponse;
import com.puc.PI4.Software.Morango.dto.response.organization.OrganizationResponse;
import com.puc.PI4.Software.Morango.dto.response.user.UserResponse;
import com.puc.PI4.Software.Morango.exceptions.organization.OrganizationAlreadyExist;
import com.puc.PI4.Software.Morango.exceptions.organization.OrganizationNotFound;
import com.puc.PI4.Software.Morango.exceptions.user.UserNotFound;
import com.puc.PI4.Software.Morango.models.Organization;
import com.puc.PI4.Software.Morango.models.User;
import com.puc.PI4.Software.Morango.repositories.OrganizationRepository;
import com.puc.PI4.Software.Morango.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class OrganizationService {

    private final ModelMapper modelMapper;
    private final OrganizationRepository organizationRepository;
    private final UserRepository userRepository;

    public OrganizationResponse createOrganization(OrganizationRequest organizationRequest) {

        if (organizationRepository.findByCnpj(organizationRequest.getCnpj()).isPresent()) {
            throw new OrganizationAlreadyExist("Organization with cnpj " + organizationRequest.getCnpj() + " already exist");
        }

        Organization organization = Organization.builder()
                .cnpj(organizationRequest.getCnpj())
                .name(organizationRequest.getName())
                .email(organizationRequest.getEmail())
                .address(organizationRequest.getAddress())
                .phone(organizationRequest.getPhone())
                .createdAt(LocalDateTime.now())
                .active(true)
                .build();

        return modelMapper.map(organizationRepository.save(organization), OrganizationResponse.class);
    }

    public EmployeesOrganizationResponse insertUserIntoOrganization(String employeeEmail, String organizationCnpj) {

        User user = userRepository.findByEmail(employeeEmail).orElseThrow(
                () -> new UserNotFound("User with email " + employeeEmail + " not found"));

        Organization organization = organizationRepository.findByCnpj(organizationCnpj).orElseThrow(
                () ->  new OrganizationNotFound("Organization with cnpj " + organizationCnpj + " not found"));

        user.setIdOrganization(organization.getId());
        organization.setEmployees(user);

        userRepository.save(user);
        organizationRepository.save(organization);

        List<UserResponse> userResponses = organization.getEmployees().stream()
                .map(u -> modelMapper.map(user, UserResponse.class))
                .toList();

        return EmployeesOrganizationResponse.builder()
                .nameOrganization(organization.getName())
                .employees(userResponses)
                .build();
    }

}
