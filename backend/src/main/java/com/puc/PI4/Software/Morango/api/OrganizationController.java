package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.organization.OrganizationRequest;
import com.puc.PI4.Software.Morango.dto.response.organization.EmployeesOrganizationResponse;
import com.puc.PI4.Software.Morango.dto.response.organization.OrganizationResponse;
import com.puc.PI4.Software.Morango.services.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<EmployeesOrganizationResponse> insertUserIntoOrganization(@RequestParam String employeeEmail
            , @RequestParam String organizationCnpj)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(organizationService.insertUserIntoOrganization
                (employeeEmail, organizationCnpj));
    }
}
