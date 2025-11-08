package com.puc.PI4.Software.Morango.dto.request.Authentication;

import com.puc.PI4.Software.Morango.dto.enums.UserRole;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterResquest {
    @NotBlank
    private String name;
    @NotBlank
    private String email;
    @NotBlank
    private String password;
    @NotBlank
    private String cpf;
    @NonNull
    private UserRole role;
}
