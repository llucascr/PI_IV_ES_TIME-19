package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.request.organization.OrganizationRequest;
import com.puc.PI4.Software.Morango.dto.response.organization.OrganizationResponse;
import com.puc.PI4.Software.Morango.exceptions.organization.OrganizationAlreadyExist;
import com.puc.PI4.Software.Morango.exceptions.organization.OrganizationNotFound;
import com.puc.PI4.Software.Morango.models.Organization;
import com.puc.PI4.Software.Morango.repositories.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class OrganizationService {

    private final ModelMapper modelMapper;
    private final OrganizationRepository organizationRepository;

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

}
