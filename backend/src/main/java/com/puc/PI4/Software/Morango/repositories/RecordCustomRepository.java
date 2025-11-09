package com.puc.PI4.Software.Morango.repositories;

import com.puc.PI4.Software.Morango.dto.response.Record.RecordResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface RecordCustomRepository {
    Optional<RecordResponse> findById(String id);
    Page<RecordResponse> findAllEnriched(Pageable pageable);
}
