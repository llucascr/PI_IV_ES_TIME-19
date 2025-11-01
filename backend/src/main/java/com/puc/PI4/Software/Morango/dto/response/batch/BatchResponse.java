package com.puc.PI4.Software.Morango.dto.response.batch;

import com.puc.PI4.Software.Morango.dto.enums.BatchSituation;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BatchResponse {

    private String id;

    private String name;
    private Double area;

    private BatchSituation situation;

    private String clientEmail;
    private String organizationName;
}
