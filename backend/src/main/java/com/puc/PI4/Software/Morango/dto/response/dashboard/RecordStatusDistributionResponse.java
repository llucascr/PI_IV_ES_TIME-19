package com.puc.PI4.Software.Morango.dto.response.dashboard;

import com.puc.PI4.Software.Morango.dto.enums.RecordStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RecordStatusDistributionResponse {
    private RecordStatus status;
    private Long total;
}
