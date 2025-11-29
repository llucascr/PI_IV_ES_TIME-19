package com.puc.PI4.Software.Morango.exceptions.user;

import com.puc.PI4.Software.Morango.exceptions.ApiExceptionInterface;
import org.springframework.http.HttpStatus;

public class CpfInvalid extends RuntimeException implements ApiExceptionInterface {

    private final String code = "CPF_INVALID";
    private String message;

    public CpfInvalid(String message) {
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
