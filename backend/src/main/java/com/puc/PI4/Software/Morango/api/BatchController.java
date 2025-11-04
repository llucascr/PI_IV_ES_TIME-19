package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.Post.PostRequest;
import com.puc.PI4.Software.Morango.dto.request.batch.BatchRequest;
import com.puc.PI4.Software.Morango.dto.response.Post.PostResponse;
import com.puc.PI4.Software.Morango.dto.response.batch.BatchResponse;
import com.puc.PI4.Software.Morango.services.BatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/batch")
public class BatchController {

    private final BatchService batchService;

    @PostMapping("/create")
    public ResponseEntity<BatchResponse> createBatch(@RequestBody BatchRequest batchRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(batchService.createBatch(batchRequest));
    }

    @PutMapping("/update")
    public ResponseEntity<BatchResponse> updateBatch(@RequestParam String batchId, @RequestBody BatchRequest batchRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(batchService.updateBatch(batchId, batchRequest));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<BatchResponse> deleteBatch(@RequestParam String batchId) {
        return ResponseEntity.status(HttpStatus.OK).body(batchService.deleteBatch(batchId));
    }

    @GetMapping("/find")
    public ResponseEntity<BatchResponse> findBatch(@RequestParam String batchId) {
        return ResponseEntity.status(HttpStatus.OK).body(batchService.findBatchById(batchId));
    }

}
