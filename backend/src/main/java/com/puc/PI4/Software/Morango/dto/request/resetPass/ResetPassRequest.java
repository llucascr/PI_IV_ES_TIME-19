package com.puc.PI4.Software.Morango.dto.request.resetPass;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResetPassRequest {
    private String email;
}
