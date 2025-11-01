package com.puc.PI4.Software.Morango.models;


import com.puc.PI4.Software.Morango.dto.enums.BatchSituation;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "batch")
public class Batch {

    @Id
    private String _id;

    private String id;

    private String name;
    private Double area;

    private BatchSituation situation;

    private String clientId;
    private String organizationId;

}
