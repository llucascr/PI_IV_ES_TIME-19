package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.enums.RecordStatus;
import com.puc.PI4.Software.Morango.dto.request.Record.RecordRequest;
import com.puc.PI4.Software.Morango.dto.response.Record.RecordResponse;
import com.puc.PI4.Software.Morango.exceptions.batch.BatchNotFound;
import com.puc.PI4.Software.Morango.exceptions.client.ClientNotFound;
import com.puc.PI4.Software.Morango.exceptions.record.RecordNotFound;
import com.puc.PI4.Software.Morango.exceptions.user.UserNotFound;
import com.puc.PI4.Software.Morango.models.*;
import com.puc.PI4.Software.Morango.models.Record;
import com.puc.PI4.Software.Morango.repositories.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class RecordService {

    private final RecordRepository recordRepository;
    private final RecordCustomRepository recordCustomRepository;

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final BatchRepository batchRepository;

    public RecordResponse createRecord(RecordRequest recordRequest) {

        User user = userRepository.findById(recordRequest.getUserId()).orElseThrow(
                () -> new UserNotFound("User not found"));

        Client client = clientRepository.findById(recordRequest.getClientId()).orElseThrow(
                () -> new ClientNotFound("Client not found"));

        Batch batch = batchRepository.findById(recordRequest.getBatchId()).orElseThrow(
                () -> new BatchNotFound("Batch not found")
        );

        RecordStatus status = RecordStatus.fromValue(recordRequest.getDevelopmentStatus());

        Record record = Record.builder()
                .id(UUID.randomUUID().toString())
                .dataHora(recordRequest.getDataHora())
                .developmentStatus(status)
                .investmentLevel(recordRequest.getInvestmentLevel())
                .evaluatedPlantsCount(recordRequest.getEvaluatedPlantsCount())
                .attackedPlantsCount(recordRequest.getAttackedPlantsCount())
                .infestationPercentage(recordRequest.getInfestationPercentage())
                .observation(recordRequest.getObservation())
                .userId(recordRequest.getUserId())
                .organizationId(user.getIdOrganization())
                .clientId(client.getId())
                .batchId(batch.getId())
                .createAt(LocalDateTime.now())
                .build();

        Record saveRecord = recordRepository.save(record);

        return recordCustomRepository.findById(saveRecord.getId())
                .orElseThrow(() -> new RecordNotFound("Record not found"));
    }

    public Page<RecordResponse> listAllRecords(int page, int numberOfPosts) {
        Pageable pageable = PageRequest.of(page, numberOfPosts);
        Page<RecordResponse> records = recordCustomRepository.findAllEnriched(pageable);

        return new PageImpl<>(records.stream().toList(), pageable, records.getTotalElements());
    }

    public RecordResponse listById(String recordId) {
        return recordCustomRepository.findById(recordId)
                .orElseThrow(() -> new RecordNotFound("Record not found"));
    }

    public RecordResponse delete(String recordId) {
        RecordResponse dto = recordCustomRepository.findById(recordId).orElseThrow(
                () -> new RecordNotFound("Record not found"));

        recordRepository.deleteOneByIdAndOrganization(dto.getId(), dto.getOrganization().getId());

        return dto;
    }

    public RecordResponse update(String recordId, RecordRequest recordRequest) {
        Record record = recordRepository.findById(recordId).orElseThrow(
                () -> new RecordNotFound("Record not found"));

        RecordStatus status = RecordStatus.fromValue(recordRequest.getDevelopmentStatus());

        Record update = Record.builder()
                ._id(record.get_id())
                .id(record.getId())
                .dataHora(recordRequest.getDataHora())
                .developmentStatus(status)
                .investmentLevel(recordRequest.getInvestmentLevel())
                .evaluatedPlantsCount(recordRequest.getEvaluatedPlantsCount())
                .infestationPercentage(recordRequest.getInfestationPercentage())
                .attackedPlantsCount(recordRequest.getAttackedPlantsCount())
                .observation(recordRequest.getObservation())
                .userId(record.getUserId())
                .organizationId(record.getOrganizationId())
                .clientId(recordRequest.getClientId())
                .batchId(recordRequest.getBatchId())
                .createAt(record.getCreateAt())
                .updateAt(LocalDateTime.now())
                .build();


        recordRepository.save(update);

        return recordCustomRepository.findById(record.getId())
                .orElseThrow(() -> new RecordNotFound("Record not found"));

    }
}


