package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.request.batch.BatchRequest;
import com.puc.PI4.Software.Morango.dto.response.batch.BatchResponse;
import com.puc.PI4.Software.Morango.exceptions.batch.BatchInvalidArguments;
import com.puc.PI4.Software.Morango.exceptions.client.ClientNotFound;
import com.puc.PI4.Software.Morango.exceptions.organization.OrganizationNotFound;
import com.puc.PI4.Software.Morango.models.Batch;
import com.puc.PI4.Software.Morango.models.Client;
import com.puc.PI4.Software.Morango.models.Organization;
import com.puc.PI4.Software.Morango.repositories.BatchRepository;
import com.puc.PI4.Software.Morango.repositories.ClientRepository;
import com.puc.PI4.Software.Morango.repositories.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.UUID;

import static com.puc.PI4.Software.Morango.dto.enums.BatchSituation.RESERVED;

@RequiredArgsConstructor
@Service
public class BatchService {

    private final ClientRepository clientRepository;
    private final OrganizationRepository organizationRepository;
    private final BatchRepository batchRepository;

    private final ModelMapper modelMapper;

    public BatchResponse createBatch(BatchRequest batchRequest) {
        Client client = clientRepository.findById(batchRequest.getClientId()).orElseThrow(
                () -> new ClientNotFound("Client not found"));
        Organization organization = organizationRepository.findById(batchRequest.getOrganizationId()).orElseThrow(
                () -> new OrganizationNotFound("Organization not found"));

        if(client.getIdOrganizacao() != batchRequest.getOrganizationId())
            throw new BatchInvalidArguments("Client and Organization Ids doesn't match");

        Batch batch = Batch.builder()
                .id(UUID.randomUUID().toString())
                .area(batchRequest.getArea())
                .name(batchRequest.getName())
                .clientId(batchRequest.getClientId())
                .organizationId(batchRequest.getOrganizationId())
                .situation(RESERVED)
                .build()
                ;

        Batch savedBatch = batchRepository.save(batch);
        BatchResponse response = modelMapper.map(savedBatch, BatchResponse.class);
        response.setClientEmail(client.getEmail());
        response.setOrganizationName(organization.getName());
        response.setOrganizationCNPJ(organization.getCnpj());

        return response;
    }
}
