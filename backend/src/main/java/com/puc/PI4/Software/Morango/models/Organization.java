package com.puc.PI4.Software.Morango.models;


import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "organization")
public class Organization {

    @Id
    private String _id;

    private String id;

    private String cnpj;
    private String name;
    private String email;
    private String address;
    private String phone;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Boolean active;

    private List<User> employees = new ArrayList<>();

    public void setEmployees(User employees) {
        this.employees.add(employees);
    }
}
