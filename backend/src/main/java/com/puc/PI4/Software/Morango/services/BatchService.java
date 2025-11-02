package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.request.Post.PostRequest;
import com.puc.PI4.Software.Morango.dto.request.batch.BatchRequest;
import com.puc.PI4.Software.Morango.dto.response.Post.PostResponse;
import com.puc.PI4.Software.Morango.dto.response.batch.BatchResponse;
import com.puc.PI4.Software.Morango.exceptions.batch.BatchInvalidArguments;
import com.puc.PI4.Software.Morango.exceptions.batch.BatchNotFound;
import com.puc.PI4.Software.Morango.exceptions.client.ClientNotFound;
import com.puc.PI4.Software.Morango.exceptions.organization.OrganizationNotFound;
import com.puc.PI4.Software.Morango.exceptions.post.PostNotFound;
import com.puc.PI4.Software.Morango.models.*;
import com.puc.PI4.Software.Morango.repositories.BatchRepository;
import com.puc.PI4.Software.Morango.repositories.ClientRepository;
import com.puc.PI4.Software.Morango.repositories.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

import static com.puc.PI4.Software.Morango.dto.enums.BatchSituation.DEACTIVATED;
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

        if(!Objects.equals(client.getIdOrganizacao(), batchRequest.getOrganizationId()))
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

    public BatchResponse updateBatch(String batchId, BatchRequest batchRequest) {
        Batch batch = batchRepository.findById(batchId).orElseThrow(
                ()-> new BatchNotFound("Batch not found"));

        Organization organization = organizationRepository.findById(batch.getOrganizationId()).orElseThrow(
                () -> new OrganizationNotFound("Organization not found"));

        Client client = clientRepository.findById(batchRequest.getClientId()).orElseThrow(
                () -> new ClientNotFound("Client not found"));

        if(!Objects.equals(client.getIdOrganizacao(), batchRequest.getOrganizationId())
        || !Objects.equals(batch.getOrganizationId(), batchRequest.getOrganizationId()))
            throw new BatchInvalidArguments("Client and Organization Ids doesn't match");

        if(batchRequest.getSituation() == DEACTIVATED)
            throw new BatchInvalidArguments("Cannot deactivate batch through update");

        Batch batchUpdate = Batch.builder()
                ._id(batch.get_id())
                .id(batch.getId())
                .area(batchRequest.getArea())
                .name(batchRequest.getName())
                .clientId(batchRequest.getClientId())
                .organizationId(batch.getOrganizationId())
                .situation(batchRequest.getSituation())
                .build();



        Batch savedBatch = batchRepository.save(batchUpdate);
        BatchResponse response = modelMapper.map(savedBatch, BatchResponse.class);
        response.setClientEmail(client.getEmail());
        response.setOrganizationName(organization.getName());
        response.setOrganizationCNPJ(organization.getCnpj());

        return response;

    }
}
