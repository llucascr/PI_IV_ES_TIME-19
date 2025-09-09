package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.PragaRequest;
import com.puc.PI4.Software.Morango.models.mongodb.Praga;
import com.puc.PI4.Software.Morango.repositories.mongodb.PragaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/praga")
public class PragaController {

    private final PragaRepository pragaRepository;

    @PostMapping(value = "/create")
    public ResponseEntity<Praga> createPraga(@RequestBody PragaRequest request) {

        Praga praga = Praga.builder()
                .nomeComum(request.getNomeComum())
                .nomeCientifico(request.getNomeCientifico())
                .build();
        return ResponseEntity.status(HttpStatus.CREATED).body(pragaRepository.save(praga));
    }

}
