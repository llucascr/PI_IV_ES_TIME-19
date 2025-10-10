package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.prague.PragueRequest;
import com.puc.PI4.Software.Morango.dto.response.Post.PostResponse;
import com.puc.PI4.Software.Morango.dto.response.prague.PragueResponse;
import com.puc.PI4.Software.Morango.models.Prague;
import com.puc.PI4.Software.Morango.repositories.PragueRepository;
import com.puc.PI4.Software.Morango.services.PragueService;
import jdk.jshell.spi.ExecutionControl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/prague")
public class PragueController {

    private final PragueService pragueService;

    @PostMapping(value = "/create")
    public ResponseEntity<PragueResponse> createPrague(@RequestBody PragueRequest pragueRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pragueService.createPrague(pragueRequest));
    }

    @PutMapping(value = "/update")
    public ResponseEntity<PragueResponse> updatePrague(
            @RequestBody PragueRequest pragueRequest,
            @RequestParam String pragueId
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(pragueService.updatePrague(pragueRequest, pragueId));
    }

    @DeleteMapping(value = "/delete")
    public ResponseEntity<PragueResponse> deletePrague(@RequestParam String pragueId) {
        return ResponseEntity.status(HttpStatus.OK).body(pragueService.deletePrague(pragueId));
    }

    @GetMapping(value = "/list")
    public ResponseEntity<List<PragueResponse>> listAllPragues(
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "10", required = false) int numberOfPragues
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(pragueService.listAllPragues(page, numberOfPragues).getContent());
    }

    @GetMapping(value = "/search")
    public ResponseEntity<List<PragueResponse>> searchPrague(
            @RequestParam String query,
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "10", required = false) int numberOfPragues
    ){
        return ResponseEntity.status(HttpStatus.OK).body(pragueService.searchPragues(query, page, numberOfPragues).getContent());
    }

    @GetMapping(value = "/find")
    public ResponseEntity<PragueResponse> searchPrague(
            @RequestParam(required = false) String pragueId,
            @RequestParam(required = false) String cientificName
    ){
        return ResponseEntity.status(HttpStatus.OK).body(pragueService.findPragueByIdOrName(pragueId, cientificName));
    }

}
