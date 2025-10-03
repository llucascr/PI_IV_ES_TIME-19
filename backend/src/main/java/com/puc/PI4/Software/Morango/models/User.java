package com.puc.PI4.Software.Morango.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "user")
public class User {

    @Id
    private String id;

    private String name;
    private String email;
    private String password;

    // TODO: idOrganizacao

}
