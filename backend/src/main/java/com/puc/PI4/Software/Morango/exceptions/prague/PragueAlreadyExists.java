package com.puc.PI4.Software.Morango.exceptions.prague;

import com.puc.PI4.Software.Morango.exceptions.ApiExceptionInterface;
import org.springframework.http.HttpStatus;

public class PragueAlreadyExists extends RuntimeException implements ApiExceptionInterface {
    private final String code = "PRAGUE_ALREADY_EXISTS";
    private String message;

    public PragueAlreadyExists(String message) {
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
