package com.puc.PI4.Software.Morango.dto.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum RecordStatus {
    SEEDLING("seedling"),                  // muda recém-plantada
    VEGETATIVE_GROWTH("vegetative_growth"), // crescimento vegetativo
    FLOWERING("flowering"),                // floração
    FRUITING("fruiting"),                  // frutificação
    RIPENING("ripening"),                  // maturação dos frutos
    HARVEST("harvest"),                    // colheita
    POST_HARVEST("post_harvest"),          // pós-colheita

    SCHEDULED("scheduled"),                // monitoramento programado
    IN_PROGRESS("in_progress"),            // em andamento
    COMPLETED("completed"),                // finalizado
    PENDING_REVIEW("pending_review"),      // aguardando validação
    CANCELLED("cancelled"),                // cancelado

    HEALTHY("healthy"),                    // cultivo saudável
    AT_RISK("at_risk"),                    // sob risco
    INFESTED("infested"),                  // infestação confirmada
    UNDER_TREATMENT("under_treatment"),    // em tratamento
    RECOVERED("recovered"),                // recuperado
    LOSS("loss");                          // perda da área

    private final String status;

    RecordStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return this.status;
    }

    @JsonCreator
    public static RecordStatus fromValue(String value) {
        for (RecordStatus s : RecordStatus.values()) {
            if (s.status.equalsIgnoreCase(value)) {
                return s;
            }
        }
        throw new IllegalArgumentException("Unknown status: " + value);
    }
}
