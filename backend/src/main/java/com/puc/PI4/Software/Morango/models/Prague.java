package com.puc.PI4.Software.Morango.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "prague")
public class Prague {

    @Id
    private String id;

    private String comumName;
    private String cientificName;

}
