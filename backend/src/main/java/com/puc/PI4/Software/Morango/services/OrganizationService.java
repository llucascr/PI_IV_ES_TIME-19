package com.puc.PI4.Software.Morango.services;

import ch.qos.logback.core.util.StringUtil;
import com.puc.PI4.Software.Morango.dto.request.organization.OrganizationRequest;
import com.puc.PI4.Software.Morango.dto.response.organization.InsertIntoOrganizationResponse;
import com.puc.PI4.Software.Morango.dto.response.organization.ListAllOrganizationResponse;
import com.puc.PI4.Software.Morango.dto.response.organization.OrganizationResponse;
import com.puc.PI4.Software.Morango.exceptions.organization.OrganizationAlreadyExist;
import com.puc.PI4.Software.Morango.exceptions.organization.OrganizationIsNotActive;
import com.puc.PI4.Software.Morango.exceptions.organization.OrganizationNotFound;
import com.puc.PI4.Software.Morango.exceptions.user.UserNotFound;
import com.puc.PI4.Software.Morango.models.Organization;
import com.puc.PI4.Software.Morango.models.User;
import com.puc.PI4.Software.Morango.repositories.OrganizationRepository;
import com.puc.PI4.Software.Morango.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

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
                .id(UUID.randomUUID().toString())
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

    public InsertIntoOrganizationResponse insertUserIntoOrganization(String employeeEmail, String organizationCnpj) {

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

        return modelMapper.map(organizationRepository.save(organization), InsertIntoOrganizationResponse.class);
    }

    public OrganizationResponse listOrganizationById(String organizationId) {
        Organization organization = organizationRepository.findById(organizationId).orElseThrow(
                () -> new  OrganizationNotFound("Organization with id " + organizationId + " not found"));
        return modelMapper.map(organization, OrganizationResponse.class);
    }

    public Page<ListAllOrganizationResponse> listAllOrganizations(int page, int numberOfOrganizations) {
        Pageable pageable = PageRequest.of(page, numberOfOrganizations);
        Page<Organization> organizations = organizationRepository.findAll(pageable);

        List<ListAllOrganizationResponse> organizationResponses = organizations.stream()
                .map(organization -> modelMapper.map(organization, ListAllOrganizationResponse.class))
                .toList();

        return new PageImpl<>(organizationResponses, pageable, organizations.getTotalElements());
    }

    public OrganizationResponse updateOrganization(String organizationId, OrganizationRequest organizationRequest) {
        Organization organization = organizationRepository.findById(organizationId).orElseThrow(
                () -> new OrganizationNotFound("Organization with id " + organizationId + " not found"));

        Organization organizationUpdated = Organization.builder()
                ._id(organization.get_id())
                .id(organization.getId())
                .cnpj(organizationRequest.getCnpj() != null ? organizationRequest.getCnpj() : organization.getCnpj())
                .name(organizationRequest.getName() != null ? organizationRequest.getName() : organization.getName())
                .email(organizationRequest.getEmail() != null ? organizationRequest.getEmail() : organization.getEmail())
                .address(organizationRequest.getAddress() != null ? organizationRequest.getAddress() : organization.getAddress())
                .phone(organizationRequest.getPhone() != null ? organizationRequest.getPhone() : organization.getPhone())
                .employees(organization.getEmployees())
                .createdAt(organization.getCreatedAt())
                .updatedAt(LocalDateTime.now())
                .active(organization.getActive())
                .build();

        return modelMapper.map(organizationRepository.save(organizationUpdated), OrganizationResponse.class);
    }

}
