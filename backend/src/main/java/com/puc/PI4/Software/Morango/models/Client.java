package com.puc.PI4.Software.Morango.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "client")
public class Client {

    @Id
    private String _id;

    @Indexed(unique = true)
    private String id;

    private String name;
    private String email;
    private String adress;
    private String phoneNumber;
    private Boolean active;
    private LocalDateTime creatAt;
    private LocalDateTime updateAt;

    private String idOrganizacao;

}
