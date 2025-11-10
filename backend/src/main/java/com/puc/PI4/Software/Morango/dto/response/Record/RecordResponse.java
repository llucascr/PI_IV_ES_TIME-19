package com.puc.PI4.Software.Morango.dto.response.Record;

import com.puc.PI4.Software.Morango.dto.enums.RecordStatus;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RecordResponse {

    @Field("id")
    private String id;

    private LocalDateTime dataHora;
    private RecordStatus developmentStatus;
    private Integer plantsCount;
    private Integer evaluatedPlantsCount;
    private Integer attackedPlantsCount;
    private Double infestationPercentage;
    private String observation;
    private LocalDateTime createAt;

    private User user;
    private Client client;
    private Batch batch;
    private Organization organization;
    private Prague prague;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class User {
        @Field("id")
        private String id;
        private String name;
        private String email;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Client {
        @Field("id")
        private String id;
        private String name;
        private String phoneNumber;
        private String email;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Batch {
        @Field("id")
        private String id;
        private String name;
        private Double area;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Organization {
        @Field("id")
        private String id;
        private String name;
        private String cnpj;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Prague {
        @Field("id")
        private String id;
        private String comumName;
        private String cientificName;
    }
}

