package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.request.client.ClientRequest;
import com.puc.PI4.Software.Morango.dto.response.client.ClientResponse;
import com.puc.PI4.Software.Morango.exceptions.client.ClientAlreadyExist;
import com.puc.PI4.Software.Morango.exceptions.client.ClientNotFound;
import com.puc.PI4.Software.Morango.exceptions.organization.OrganizationNotFound;
import com.puc.PI4.Software.Morango.models.Client;
import com.puc.PI4.Software.Morango.models.Organization;
import com.puc.PI4.Software.Morango.repositories.ClientRepository;
import com.puc.PI4.Software.Morango.repositories.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
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
                .active(true)
                .creatAt(LocalDateTime.now())
                .idOrganizacao(idOrgazanition)
                .build();

        return modelMapper.map(clientRepository.save(client), ClientResponse.class);
    }

    public Page<ClientResponse> listAllClietsByOrganization(String idOrgazanition, Boolean active, int page, int size) {

        organizationRepository.findById(idOrgazanition).orElseThrow(
                () -> new OrganizationNotFound("Organization with id " + idOrgazanition + " not found"));

        Pageable pageable = PageRequest.of(page, size);
        Page<Client> clients = clientRepository.findClientByIdOrganization(idOrgazanition, active, pageable);

        List<ClientResponse> clientResponses = clients.stream()
                .map(client -> modelMapper.map(client, ClientResponse.class))
                .toList();

        return new PageImpl<>(clientResponses, pageable, clients.getTotalElements());
    }

    public ClientResponse disableClient(String idClient) {
        Client client = clientRepository.findById(idClient).orElseThrow(
                () -> new ClientNotFound("Client with id " + idClient + " not found"));

        client.setActive(false);
        return modelMapper.map(clientRepository.save(client), ClientResponse.class);
    }

}
