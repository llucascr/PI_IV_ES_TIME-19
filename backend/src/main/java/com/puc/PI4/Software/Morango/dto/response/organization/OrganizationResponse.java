package com.puc.PI4.Software.Morango.dto.response.organization;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.puc.PI4.Software.Morango.dto.response.user.UserResponse;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrganizationResponse {
    private String cnpj;
    private String name;
    private String email;
    private String address;
    private String phone;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean active;
    private List<UserResponse> users;
}
