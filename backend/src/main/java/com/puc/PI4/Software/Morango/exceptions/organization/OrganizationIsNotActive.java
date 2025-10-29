package com.puc.PI4.Software.Morango.exceptions.organization;

import com.puc.PI4.Software.Morango.exceptions.ApiExceptionInterface;
import org.springframework.http.HttpStatus;

public class OrganizationIsNotActive extends RuntimeException implements ApiExceptionInterface {

    private final String code = "ORGANIZATION_IS_NOT_ACTIVE";
    private String message;

    public OrganizationIsNotActive(String message) {
        this.message = message;
    }

    @Override
    public String getCode() {
        return code;
    }

    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public HttpStatus getHttpStatus() {
        return HttpStatus.NOT_FOUND;
    }

}
