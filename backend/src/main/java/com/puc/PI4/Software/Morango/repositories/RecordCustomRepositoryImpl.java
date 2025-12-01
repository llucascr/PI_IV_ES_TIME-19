package com.puc.PI4.Software.Morango.repositories;

import com.puc.PI4.Software.Morango.dto.response.Record.RecordResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationOperation;
import org.springframework.data.mongodb.core.aggregation.ConditionalOperators;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.query.Criteria;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class RecordCustomRepositoryImpl implements RecordCustomRepository {

    private final MongoTemplate mongoTemplate;

    private Aggregation buildEnrichmentPipeline(Pageable pageable) {
        return buildEnrichmentPipeline(null, pageable);
    }

    private Aggregation buildEnrichmentPipeline(Criteria criteria) {
        return buildEnrichmentPipeline(criteria, null);
    }

    private Aggregation buildEnrichmentPipeline(Criteria criteria, Pageable pageable) {
        List<AggregationOperation> operations = new ArrayList<>();

        // Filtro (opcional)
        if (criteria != null) {
            operations.add(Aggregation.match(criteria));
        }

        // Joins
        operations.add(Aggregation.lookup("user", "userId", "id", "user"));
        operations.add(Aggregation.lookup("client", "clientId", "id", "client"));
        operations.add(Aggregation.lookup("batch", "batchId", "id", "batch"));
        operations.add(Aggregation.lookup("organization", "organizationId", "id", "organization"));
        operations.add(Aggregation.lookup("prague", "pragueId", "id", "prague"));

        // Unwinds
        operations.add(Aggregation.unwind("user", true));
        operations.add(Aggregation.unwind("client", true));
        operations.add(Aggregation.unwind("batch", true));
        operations.add(Aggregation.unwind("organization", true));
        operations.add(Aggregation.unwind("prague", true));

        // Project
        operations.add(Aggregation.project("id", "dataHora", "observation", "developmentStatus",
                        "plantsCount", "evaluatedPlantsCount", "attackedPlantsCount",
                        "infestationPercentage", "createAt")
                .and("user.id").as("user.id")
                .and("user.name").as("user.name")
                .and("user.email").as("user.email")
                .and("client.id").as("client.id")
                .and("client.name").as("client.name")
                .and("client.phoneNumber").as("client.phoneNumber")
                .and("client.email").as("client.email")
                .and("batch.id").as("batch.id")
                .and("batch.name").as("batch.name")
                .and("batch.area").as("batch.area")
                .and("organization.id").as("organization.id")
                .and("organization.name").as("organization.name")
                .and("organization.cnpj").as("organization.cnpj")
                .and("prague").as("prague")
        );

        // Paginação
        if (pageable != null) {
            long skip = (long) pageable.getPageNumber() * pageable.getPageSize();
            operations.add(Aggregation.skip(skip));
            operations.add(Aggregation.limit(pageable.getPageSize()));
        }

        return Aggregation.newAggregation(operations);
    }

    @Override
    public Optional<RecordResponse> findById(String id) {
        Criteria criteria = Criteria.where("id").is(id);
        Aggregation aggregation = buildEnrichmentPipeline(criteria);

        List<RecordResponse> results = mongoTemplate
                .aggregate(aggregation, "record", RecordResponse.class)
                .getMappedResults();

        return results.stream().findFirst();
    }

    @Override
    public Page<RecordResponse> findAllEnrichedByOrg(Pageable pageable, String id) {
        Criteria criteria = Criteria.where("organizationId").is(id);
        Aggregation aggregation = buildEnrichmentPipeline(criteria, pageable);


        List<RecordResponse> records = mongoTemplate
                .aggregate(aggregation, "record", RecordResponse.class)
                .getMappedResults();

        long total = mongoTemplate.getCollection("record").countDocuments();
        return new PageImpl<>(records, pageable, total);
    }

    @Override
    public Page<RecordResponse> findAllEnriched(Pageable pageable) {
        Aggregation aggregation = buildEnrichmentPipeline(pageable);

        List<RecordResponse> records = mongoTemplate
                .aggregate(aggregation, "record", RecordResponse.class)
                .getMappedResults();

        long total = mongoTemplate.getCollection("record").countDocuments();
        return new PageImpl<>(records, pageable, total);
    }

}
