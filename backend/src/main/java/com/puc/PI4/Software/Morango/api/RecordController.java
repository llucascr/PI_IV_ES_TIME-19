package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.Record.RecordRequest;
import com.puc.PI4.Software.Morango.dto.response.Record.RecordResponse;
import com.puc.PI4.Software.Morango.services.RecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/record")
public class RecordController {

    private final RecordService recordService;

    @PostMapping("/create")
    public ResponseEntity<RecordResponse> createRecord(@RequestBody @Valid RecordRequest recordRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(recordService.createRecord(recordRequest));
    }

    @GetMapping("/list")
    public ResponseEntity<List<RecordResponse>> listAllRecord(
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "10", required = false) int numberOfPosts
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(recordService.listAllRecords(page, numberOfPosts).getContent());
    }

    @PutMapping("/prague/update")
    public RecordResponse updatePrague(
            @RequestParam String recordId,
            @RequestParam String pragueId) {
        return recordService.updatePrague(recordId, pragueId);
    }

    @GetMapping("/listById")
    public ResponseEntity<RecordResponse> listById(
            @RequestParam String recordId
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(recordService.listById(recordId));
    }

    @GetMapping("/listByOrg")
    public ResponseEntity<List<RecordResponse>> listByOrg(
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "10", required = false) int numberOfPosts,
            @RequestParam String organizationId
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(recordService.listByOrg(page, numberOfPosts, organizationId).getContent());
    }

    @DeleteMapping("/delete")
    public ResponseEntity<RecordResponse> deletePost(@RequestParam String recordId) {
        return ResponseEntity.status(HttpStatus.OK).body(recordService.delete(recordId));
    }

    @PutMapping("/update")
    public ResponseEntity<RecordResponse> updatePost(@RequestParam String recordId, @RequestBody RecordRequest recordRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(recordService.update(recordId, recordRequest));
    }
}
