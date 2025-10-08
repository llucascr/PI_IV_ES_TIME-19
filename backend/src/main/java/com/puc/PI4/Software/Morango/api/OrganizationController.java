package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.organization.OrganizationRequest;
import com.puc.PI4.Software.Morango.dto.response.organization.InsertIntoOrganizationResponse;
import com.puc.PI4.Software.Morango.dto.response.organization.ListAllOrganizationResponse;
import com.puc.PI4.Software.Morango.dto.response.organization.OrganizationResponse;
import com.puc.PI4.Software.Morango.services.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/organization")
public class OrganizationController {

    private final OrganizationService organizationService;

    @PostMapping("/create")
    public ResponseEntity<OrganizationResponse> createOrganization(@RequestBody OrganizationRequest organizationRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(organizationService.createOrganization(organizationRequest));
    }

    @PostMapping("/insertEmployee")
    public ResponseEntity<InsertIntoOrganizationResponse> insertUserIntoOrganization(@RequestParam String employeeEmail
            , @RequestParam String organizationCnpj)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(organizationService.insertUserIntoOrganization
                (employeeEmail, organizationCnpj));
    }

    @GetMapping("/listById")
    public ResponseEntity<OrganizationResponse> listOrganizationById(@RequestParam String organizationId) {
        return ResponseEntity.status(HttpStatus.OK).body(organizationService.listOrganizationById(organizationId));
    }

    @GetMapping("/list")
    public ResponseEntity<List<ListAllOrganizationResponse>> listAllOrganizations(
            @RequestParam(defaultValue = "0", required = false) int page,
            @RequestParam(defaultValue = "10", required = false) int numberOfOrganizations
    ) {
        return ResponseEntity.status(HttpStatus.OK).body(organizationService
                .listAllOrganizations(page, numberOfOrganizations).getContent());
    }

    @PutMapping("/update")
    public ResponseEntity<OrganizationResponse> updateOrganization(@RequestParam String organizationId,
                                                                   @RequestBody OrganizationRequest organizationRequest) {
        return ResponseEntity.status(HttpStatus.OK).body(organizationService.updateOrganization(organizationId, organizationRequest));
    }

}
