package com.puc.PI4.Software.Morango.api;

import com.puc.PI4.Software.Morango.dto.response.dashboard.AvgInfestationByClientResponse;
import com.puc.PI4.Software.Morango.dto.response.dashboard.RecordStatusDistributionResponse;
import com.puc.PI4.Software.Morango.dto.response.dashboard.InfestationTrendResponse;
import com.puc.PI4.Software.Morango.services.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/infestation-trend")
    public List<InfestationTrendResponse> getInfestationTrend() {
        return dashboardService.getInfestationTrend();
    }

    @GetMapping("/infestation-avg")
    public List<AvgInfestationByClientResponse> getAvgInfestationByClient() {
        return dashboardService.getAvgInfestationByClient();
    }

    @GetMapping("/record-status")
    public List<RecordStatusDistributionResponse> getDevelopmentStatusDistribution() {
        return dashboardService.getDevelopmentStatusDistribution();
    }

}
