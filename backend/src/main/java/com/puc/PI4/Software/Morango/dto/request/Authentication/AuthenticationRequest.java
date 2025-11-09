package com.puc.PI4.Software.Morango.dto.request.Authentication;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationRequest {
    @NotBlank(message = "Required Email")
    private String email;

    @NotBlank(message = "Required Password")
    private String password;
}
