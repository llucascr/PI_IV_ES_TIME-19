package com.puc.PI4.Software.Morango.repositories;

import com.mongodb.BasicDBObject;
import com.puc.PI4.Software.Morango.dto.response.dashboard.AvgInfestationByClientResponse;
import com.puc.PI4.Software.Morango.dto.response.dashboard.RecordStatusDistributionResponse;
import com.puc.PI4.Software.Morango.dto.response.dashboard.InfestationTrendResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class DashboardRepositoryImpl {
    private final MongoTemplate mongoTemplate;

    public List<InfestationTrendResponse> getInfestationTrend() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.lookup("batch", "batchId", "id", "batchInfo"),
                Aggregation.unwind("batchInfo"),
                Aggregation.sort(Sort.by(Sort.Direction.ASC, "dataHora")),
                Aggregation.group("batchId")
                        .push(new BasicDBObject("x", "$dataHora")
                                .append("y", "$infestationPercentage")).as("data")
                        .first("batchInfo.name").as("nomeLote"),
                Aggregation.project()
                        .andExpression("_id").as("batchId")
                        .andInclude("nomeLote", "data")
                        .andExclude("_id")
        );

        AggregationResults<InfestationTrendResponse> results =
                mongoTemplate.aggregate(aggregation, "record", InfestationTrendResponse.class);

        return results.getMappedResults();
    }

    public List<AvgInfestationByClientResponse> getAvgInfestationByClient() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group("clientId")
                        .avg("infestationPercentage").as("mediaInfestacao"),
                Aggregation.lookup("client", "_id", "id", "cliente"),
                Aggregation.unwind("cliente"),
                Aggregation.project()
                        .and("cliente.name").as("cliente")
                        .and("mediaInfestacao").as("mediaInfestacao")
                        .andExclude("_id")
        );

        AggregationResults<AvgInfestationByClientResponse> results =
                mongoTemplate.aggregate(aggregation, "record", AvgInfestationByClientResponse.class);

        return results.getMappedResults();
    }

    public List<RecordStatusDistributionResponse> getDevelopmentStatusDistribution() {
        Aggregation aggregation = Aggregation.newAggregation(
                Aggregation.group("developmentStatus").count().as("total"),
                Aggregation.project()
                        .andExpression("_id").as("status")
                        .andInclude("total")
                        .andExclude("_id")
        );

        AggregationResults<RecordStatusDistributionResponse> results =
                mongoTemplate.aggregate(aggregation, "record", RecordStatusDistributionResponse.class);

        return results.getMappedResults();
    }
}
