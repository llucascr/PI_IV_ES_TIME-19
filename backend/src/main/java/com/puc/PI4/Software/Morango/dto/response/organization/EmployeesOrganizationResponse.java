package com.puc.PI4.Software.Morango.dto.response.organization;

import com.puc.PI4.Software.Morango.dto.response.user.UserResponse;
import lombok.*;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmployeesOrganizationResponse {
    private String nameOrganization;
    private List<UserResponse> employees;
}
