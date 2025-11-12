package com.puc.PI4.Software.Morango.dto.response.dashboard;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class InfestationTrendResponse {
    private String batchId;
    private String nomeLote;
    private List<Map<String, Object>> data; // cada item tem {x, y}
}
