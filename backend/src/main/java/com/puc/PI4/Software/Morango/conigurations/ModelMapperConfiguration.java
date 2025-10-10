package com.puc.PI4.Software.Morango.conigurations;

import com.puc.PI4.Software.Morango.dto.response.organization.InsertIntoOrganizationResponse;
import com.puc.PI4.Software.Morango.dto.response.organization.OrganizationResponse;
import com.puc.PI4.Software.Morango.models.Organization;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfiguration {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        TypeMap<Organization, InsertIntoOrganizationResponse> employeesOrgMap = modelMapper
                .createTypeMap(Organization.class, InsertIntoOrganizationResponse.class);
        employeesOrgMap.addMapping(Organization::getName, InsertIntoOrganizationResponse::setNameOrganization);
        employeesOrgMap.addMapping(Organization::getEmployees, InsertIntoOrganizationResponse::setEmployees);

        TypeMap<Organization, OrganizationResponse> orgMap = modelMapper
                .createTypeMap(Organization.class, OrganizationResponse.class);
        orgMap.addMapping(Organization::getEmployees, OrganizationResponse::setUsers);

        return modelMapper;
    }
}
