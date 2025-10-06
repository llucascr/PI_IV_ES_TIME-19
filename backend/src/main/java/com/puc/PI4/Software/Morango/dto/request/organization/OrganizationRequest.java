package com.puc.PI4.Software.Morango.dto.request.organization;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrganizationRequest {
    private String cnpj;
    private String name;
    private String email;
    private String address;
    private String phone;
}
