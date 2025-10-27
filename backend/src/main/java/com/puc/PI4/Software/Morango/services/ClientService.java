package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.request.client.ClientRequest;
import com.puc.PI4.Software.Morango.dto.response.client.ClientResponse;
import com.puc.PI4.Software.Morango.exceptions.client.ClientAlreadyExist;
import com.puc.PI4.Software.Morango.exceptions.organization.OrganizationNotFound;
import com.puc.PI4.Software.Morango.models.Client;
import com.puc.PI4.Software.Morango.models.Organization;
import com.puc.PI4.Software.Morango.repositories.ClientRepository;
import com.puc.PI4.Software.Morango.repositories.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class ClientService {

    private final ClientRepository clientRepository;
    private final OrganizationRepository organizationRepository;

    private final ModelMapper modelMapper;

    public ClientResponse createClient(ClientRequest request, String idOrgazanition) {

        organizationRepository.findById(idOrgazanition)
                .orElseThrow(() -> new OrganizationNotFound("Organization with id " + idOrgazanition + " not found"));

        if (clientRepository.findClientByIdOrganizationAndEmail(idOrgazanition, request.getEmail()).isPresent()) {
            throw new ClientAlreadyExist("Client with email " + request.getEmail()
                    + " already exist in organization with id " + idOrgazanition);
        }

        Client client = Client.builder()
                .id(UUID.randomUUID().toString())
                .name(request.getName())
                .email(request.getEmail())
                .adress(request.getAdress())
                .phoneNumber(request.getPhoneNumber())
                .creatAt(LocalDateTime.now())
                .idOrganizacao(idOrgazanition)
                .build();

        return modelMapper.map(clientRepository.save(client), ClientResponse.class);
    }

}
