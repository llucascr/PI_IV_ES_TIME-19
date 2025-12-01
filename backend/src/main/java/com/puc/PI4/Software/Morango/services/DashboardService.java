package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.response.dashboard.AvgInfestationByClientResponse;
import com.puc.PI4.Software.Morango.dto.response.dashboard.RecordStatusDistributionResponse;
import com.puc.PI4.Software.Morango.dto.response.dashboard.InfestationTrendResponse;
import com.puc.PI4.Software.Morango.repositories.DashboardRepositoryImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DashboardService {

    private final DashboardRepositoryImpl dashboardRepository;

    public List<InfestationTrendResponse> getInfestationTrend() {
        return dashboardRepository.getInfestationTrend();
    }

    public List<AvgInfestationByClientResponse> getAvgInfestationByClient() {
        return dashboardRepository.getAvgInfestationByClient();
    }

    public List<RecordStatusDistributionResponse> getDevelopmentStatusDistribution() {
        return dashboardRepository.getDevelopmentStatusDistribution();
    }
}