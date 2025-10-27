package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.client.ClientRequest;
import com.puc.PI4.Software.Morango.dto.response.client.ClientResponse;
import com.puc.PI4.Software.Morango.services.ClientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/listByOrg")
    public ResponseEntity<List<ClientResponse>> listAllClientsByOrganization(
            @RequestParam String idOrganization,
            @RequestParam(defaultValue = "true", required = false) Boolean active,
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "10", required = false) int size
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(clientService.listAllClietsByOrganization(
                idOrganization, active,page, size).getContent());
    }

    @PutMapping("/disable")
    public ResponseEntity<ClientResponse> disableClient(@RequestParam String idClient) {
        return ResponseEntity.status(HttpStatus.OK).body(clientService.disableClient(idClient));
    }

    @PutMapping("/update")
    public ResponseEntity<ClientResponse> updateClient(
            @RequestParam String idClient,
            @RequestBody ClientRequest request,
            @RequestParam String idOrganization
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(clientService.updateClient(idClient, request, idOrganization));
    }

}
