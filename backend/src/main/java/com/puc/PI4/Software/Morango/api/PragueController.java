package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.prague.PragueRequest;
import com.puc.PI4.Software.Morango.dto.response.prague.PragueResponse;
import com.puc.PI4.Software.Morango.models.Prague;
import com.puc.PI4.Software.Morango.repositories.PragueRepository;
import com.puc.PI4.Software.Morango.services.PragueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/prague")
public class PragueController {

    private final PragueService pragueService;

    @PostMapping(value = "/create")
    public ResponseEntity<PragueResponse> createPrague(@RequestBody PragueRequest pragueRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(pragueService.createPrague(pragueRequest));
    }

}
