package com.puc.PI4.Software.Morango.models;

import jakarta.persistence.Id;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "praga")
public class Praga {

    @Id
    private String id;

    private String nomeComum;

    private String nomeCientifico;

}
