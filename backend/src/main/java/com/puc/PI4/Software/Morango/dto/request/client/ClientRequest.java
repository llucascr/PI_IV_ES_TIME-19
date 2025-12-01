package com.puc.PI4.Software.Morango.dto.request.client;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClientRequest {
    private String name;
    private String email;
    private String adress;
    private String phoneNumber;
}
