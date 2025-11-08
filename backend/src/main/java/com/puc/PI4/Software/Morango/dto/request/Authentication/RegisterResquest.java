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
    @NotBlank(message = "Required Name")
    private String name;

    @NotBlank(message = "Required Email")
    private String email;

    @NotBlank(message = "Required Password")
    private String password;

    @NotBlank(message = "Required CPF")
    private String cpf;

    @NonNull
    private UserRole role;
}
