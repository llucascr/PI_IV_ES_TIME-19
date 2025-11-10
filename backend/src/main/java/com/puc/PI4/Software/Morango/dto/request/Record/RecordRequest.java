package com.puc.PI4.Software.Morango.dto.request.Record;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.puc.PI4.Software.Morango.validation.ValidRecordStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordRequest {
    @NotNull(message = "User ID is required")
    private String userId;

    @NotNull(message = "Client ID is required")
    private String clientId;

    @NotNull(message = "Batch ID is required")
    private String batchId;

    @NotNull(message = "Date and time are required")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataHora;

    @ValidRecordStatus
    private String developmentStatus;

    @Min(value = 1, message = "The number of plants must be greater than 0")
    private int plantsCount;

    @Min(value = 0, message = "Evaluated plants count cannot be negative")
    private int evaluatedPlantsCount;

    @Min(value = 0, message = "Attacked plants count cannot be negative")
    private int attackedPlantsCount;

    @DecimalMin(value = "0.0", message = "Infestation percentage cannot be negative")
    private float infestationPercentage;

    @NotBlank(message = "Observation cannot be empty")
    private String observation;
}


// developmentStatus
// investmentLevel
// evaluatedPlantsCount
// attackedPlantsCount
// infestationPercentage
// observation


//idTalhao
//        idCliente
//idOrganizacao
//        idPraga
//        idUsuario
