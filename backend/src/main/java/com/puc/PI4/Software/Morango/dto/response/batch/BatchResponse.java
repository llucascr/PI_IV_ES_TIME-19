package com.puc.PI4.Software.Morango.dto.response.batch;

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

    private String clientEmail;
    private String organizationName;
}
