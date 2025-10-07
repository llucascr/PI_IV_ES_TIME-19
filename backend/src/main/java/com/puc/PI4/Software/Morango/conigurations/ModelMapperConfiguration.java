package com.puc.PI4.Software.Morango.conigurations;

import com.puc.PI4.Software.Morango.dto.response.organization.EmployeesOrganizationResponse;
import com.puc.PI4.Software.Morango.dto.response.organization.OrganizationResponse;
import com.puc.PI4.Software.Morango.dto.response.user.UserResponse;
import com.puc.PI4.Software.Morango.models.Organization;
import com.puc.PI4.Software.Morango.models.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfiguration {

//    @Bean
//    public ModelMapper modelMapper() {return new ModelMapper();}

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        modelMapper.createTypeMap(User.class, UserResponse.class);

        TypeMap<Organization, EmployeesOrganizationResponse> employeesOrgMap = modelMapper
                .createTypeMap(Organization.class, EmployeesOrganizationResponse.class);
        employeesOrgMap.addMapping(Organization::getName, EmployeesOrganizationResponse::setNameOrganization);
        employeesOrgMap.addMapping(Organization::getEmployees, EmployeesOrganizationResponse::setEmployees);

        TypeMap<Organization, OrganizationResponse> orgMap = modelMapper
                .createTypeMap(Organization.class, OrganizationResponse.class);
        orgMap.addMapping(Organization::getEmployees, OrganizationResponse::setUsers);

        return modelMapper;
    }
}
