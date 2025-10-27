package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.client.ClientRequest;
import com.puc.PI4.Software.Morango.dto.response.client.ClientResponse;
import com.puc.PI4.Software.Morango.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/client")
public class ClientController {

    private final ClientService clientService;

    @PostMapping("/create")
    public ResponseEntity<ClientResponse> createClient(@RequestBody ClientRequest clientRequest,
                                                       @RequestParam String idOrganization) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clientService.createClient(clientRequest, idOrganization));
    }

}
