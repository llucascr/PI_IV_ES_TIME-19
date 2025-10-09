package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.request.prague.PragueRequest;
import com.puc.PI4.Software.Morango.dto.response.prague.PragueResponse;
import com.puc.PI4.Software.Morango.exceptions.prague.PragueAlreadyExists;
import com.puc.PI4.Software.Morango.exceptions.prague.PragueNotFound;
import com.puc.PI4.Software.Morango.models.Prague;
import com.puc.PI4.Software.Morango.repositories.PragueRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;


@Slf4j
@RequiredArgsConstructor
@Service
public class PragueService {

    private final ModelMapper modelMapper;
    private final PragueRepository pragueRepository;

    public PragueResponse createPrague(PragueRequest pragueRequest) {
        if (pragueRepository.findByComumOrCientificName(pragueRequest.getComumName(), pragueRequest.getCientificName()).isPresent())
        {
            throw new PragueAlreadyExists(pragueRequest.getCientificName() + " already exists");
        }

        Prague prague = Prague.builder()
                .comumName(pragueRequest.getComumName())
                .cientificName(pragueRequest.getCientificName())
                .build();

        return modelMapper.map(pragueRepository.save(prague), PragueResponse.class);
    }

    public PragueResponse updatePrague(PragueRequest pragueRequest, String pragueId) {
        Prague prague = pragueRepository.findById(pragueId).orElseThrow(
                () -> new PragueNotFound("Prague with id " + pragueId + " not found")
        );

        Prague updatedPrage = Prague.builder()
                .id(pragueId)
                .cientificName(pragueRequest.getCientificName())
                .comumName(pragueRequest.getComumName())
                .build();

        return modelMapper.map(pragueRepository.save(prague), PragueResponse.class);
    }

    public Page<PragueResponse> listAllPragues(int page, int numberOfPragues)
    {}
}
