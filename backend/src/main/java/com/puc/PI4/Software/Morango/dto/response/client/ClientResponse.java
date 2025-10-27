package com.puc.PI4.Software.Morango.dto.response.client;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ClientResponse {
    private String id;
    private String name;
    private String email;
    private String adress;
    private String phoneNumber;
    private Boolean active;
    private LocalDateTime creatAt;
    private LocalDateTime updateAt;
}
