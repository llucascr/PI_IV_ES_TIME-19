package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.request.prague.PragueRequest;
import com.puc.PI4.Software.Morango.dto.response.prague.PragueResponse;
import com.puc.PI4.Software.Morango.exceptions.prague.PragueAlreadyExists;
import com.puc.PI4.Software.Morango.exceptions.prague.PragueInvalidFormat;
import com.puc.PI4.Software.Morango.exceptions.prague.PragueNotFound;
import com.puc.PI4.Software.Morango.models.Prague;
import com.puc.PI4.Software.Morango.repositories.PragueRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;


@Slf4j
@RequiredArgsConstructor
@Service
public class PragueService {

    private final ModelMapper modelMapper;
    private final PragueRepository pragueRepository;

    private boolean isPragueValid(PragueRequest pragueRequest) {
        return pragueRequest.getCientificName() != null && !pragueRequest.getCientificName().isEmpty()
                && pragueRequest.getComumName() != null && !pragueRequest.getComumName().isEmpty();
    }

    public PragueResponse createPrague(PragueRequest pragueRequest) {
        if (pragueRepository.findByCientificName(pragueRequest.getCientificName()).isPresent())
        {
            throw new PragueAlreadyExists(pragueRequest.getCientificName() + " already exists");
        }
        if (!isPragueValid(pragueRequest)) {
            throw new PragueInvalidFormat("Request invalid or missing fields");
        }

        Prague prague = Prague.builder()
                .id(UUID.randomUUID().toString())
                .comumName(pragueRequest.getComumName())
                .cientificName(pragueRequest.getCientificName())
                .build();

        return modelMapper.map(pragueRepository.save(prague), PragueResponse.class);
    }

    public PragueResponse updatePrague(PragueRequest pragueRequest, String pragueId) {
        Prague prague = pragueRepository.findById(pragueId).orElseThrow(
                () -> new PragueNotFound("Prague with id " + pragueId + " not found")
        );
        if (isPragueValid(pragueRequest)) {
            throw new PragueInvalidFormat("Request invalid or missing fields");
        }

        Prague updatedPrage = Prague.builder()
                ._id(prague.get_id())
                .id(pragueId)
                .cientificName(pragueRequest.getCientificName())
                .comumName(pragueRequest.getComumName())
                .build();

        return modelMapper.map(pragueRepository.save(updatedPrage), PragueResponse.class);
    }

    public PragueResponse deletePrague(String pragueId) {
        Prague prague = pragueRepository.findById(pragueId).orElseThrow(
                () -> new PragueNotFound("Prague with id " + pragueId + " not found")
        );

        pragueRepository.delete(prague);

        return modelMapper.map(prague, PragueResponse.class);
    }

    public Page<PragueResponse> listAllPragues(int page, int numberOfPragues)
    {
        Pageable pageable = PageRequest.of(page, numberOfPragues);
        Page<Prague> pragues = pragueRepository.findAll(pageable);

        List<PragueResponse> pragueResponses = pragues.getContent().stream()
                .map(prague -> PragueResponse.builder()
                        ._id(prague.get_id())
                        .id(prague.getId())
                        .cientificName(prague.getCientificName())
                        .comumName(prague.getComumName())
                        .build())
                .toList();
        return new PageImpl<>(pragueResponses, pageable, pragues.getTotalElements());
    }

    public Page<PragueResponse> searchPragues(String query, int page, int numberOfPragues)
    {
        Pageable pageable = PageRequest.of(page, numberOfPragues);
        Page<Prague> pragues = pragueRepository.searchByComumOrCientificNameRegex(query, pageable);

        List<PragueResponse> pragueResponses = pragues.getContent().stream()
                .map(prague -> PragueResponse.builder()
                        ._id(prague.get_id())
                        .id(prague.getId())
                        .cientificName(prague.getCientificName())
                        .comumName(prague.getComumName())
                        .build())
                .toList();
        return new PageImpl<>(pragueResponses, pageable, pragues.getTotalElements());
    }

    public PragueResponse findPragueByIdOrName(String pragueId, String cientificName)
    {
        List<Prague> prague = pragueRepository.findByIdOrCientificName(pragueId, cientificName);

        if (prague.size() != 1) throw new PragueNotFound("Prague with id not found");

        return modelMapper.map(prague.get(0), PragueResponse.class);
    }
}
