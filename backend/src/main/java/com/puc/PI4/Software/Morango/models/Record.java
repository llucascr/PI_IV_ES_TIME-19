package com.puc.PI4.Software.Morango.models;

import com.puc.PI4.Software.Morango.dto.enums.RecordStatus;
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
@Document(collection = "record")
public class Record {

    @Id
    private String _id;

    @Indexed(unique = true)
    private String id;

    private String userId;
    private String organizationId;

    private String clientId;
    private String batchId;
    private String pragueId;

    private LocalDateTime dataHora;

    private RecordStatus developmentStatus;

    private int plantsCount;
    private int evaluatedPlantsCount;
    private int attackedPlantsCount;
    private float infestationPercentage;
    private String observation;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
