package com.puc.PI4.Software.Morango.dto.response.dashboard;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AvgInfestationByClientResponse {
    private String cliente;
    private Double mediaInfestacao;
}
