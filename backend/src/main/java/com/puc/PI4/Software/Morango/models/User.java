package com.puc.PI4.Software.Morango.models;

import com.puc.PI4.Software.Morango.dto.enums.RoleUser;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

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
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    private Boolean active;
    private RoleUser role;

    @DBRef
    private Organization organization;

}
