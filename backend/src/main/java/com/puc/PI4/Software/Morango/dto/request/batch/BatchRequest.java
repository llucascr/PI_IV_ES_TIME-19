package com.puc.PI4.Software.Morango.dto.request.batch;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BatchRequest {
    private String name;
    private Double area;
    private String clientId;
    private String organizationId;
}
