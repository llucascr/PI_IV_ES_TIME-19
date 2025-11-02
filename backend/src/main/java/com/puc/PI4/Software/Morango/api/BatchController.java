package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.batch.BatchRequest;
import com.puc.PI4.Software.Morango.dto.response.batch.BatchResponse;
import com.puc.PI4.Software.Morango.services.BatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/batch")
public class BatchController {

    private final BatchService batchService;

    @PostMapping("/create")
    public ResponseEntity<BatchResponse> createBatch(@RequestBody BatchRequest batchRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(batchService.createBatch(batchRequest));
    }

}
