package com.puc.PI4.Software.Morango.dto.response.organization;

import com.puc.PI4.Software.Morango.models.User;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserAndOrganizationResponse {
    private String cnpj;
    private String name;
    private String email;
    private String address;
    private String phone;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean active;
    private User user;
}
