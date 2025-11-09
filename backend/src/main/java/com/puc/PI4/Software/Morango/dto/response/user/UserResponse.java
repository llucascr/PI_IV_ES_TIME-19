package com.puc.PI4.Software.Morango.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String id;
    private String name;
    private String email;
    private String cpf;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private Boolean active;
}
