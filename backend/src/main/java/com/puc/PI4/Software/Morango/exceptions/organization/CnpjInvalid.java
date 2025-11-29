package com.puc.PI4.Software.Morango.exceptions.organization;

import com.puc.PI4.Software.Morango.exceptions.ApiExceptionInterface;
import org.springframework.http.HttpStatus;

public class CnpjInvalid extends RuntimeException implements ApiExceptionInterface {

    private final String code = "CNPJ_INVALID";
    private String message;

    public CnpjInvalid(String message) {
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
        return HttpStatus.CONFLICT;
    }

}
