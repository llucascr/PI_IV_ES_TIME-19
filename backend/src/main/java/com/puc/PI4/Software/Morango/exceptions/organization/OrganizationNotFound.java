package com.puc.PI4.Software.Morango.exceptions.organization;

import com.puc.PI4.Software.Morango.exceptions.ApiExceptionInterface;
import org.springframework.http.HttpStatus;

public class OrganizationNotFound extends RuntimeException implements ApiExceptionInterface {

    private final String code = "ORGANIZATION_NOT_FOUND";
    private String message;

    public OrganizationNotFound(String message) {
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
