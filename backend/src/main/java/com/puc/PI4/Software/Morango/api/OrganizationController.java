package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.request.organization.OrganizationRequest;
import com.puc.PI4.Software.Morango.dto.response.organization.OrganizationResponse;
import com.puc.PI4.Software.Morango.services.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/organization")
public class OrganizationController {

    private final OrganizationService organizationService;

    @PostMapping("/create")
    public ResponseEntity<OrganizationResponse> createOrganization(@RequestBody OrganizationRequest organizationRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(organizationService.createOrganization(organizationRequest));
    }
}
