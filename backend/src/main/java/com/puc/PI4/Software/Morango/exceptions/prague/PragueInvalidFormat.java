package com.puc.PI4.Software.Morango.exceptions.prague;

import com.puc.PI4.Software.Morango.exceptions.ApiExceptionInterface;
import org.springframework.http.HttpStatus;

public class PragueInvalidFormat extends RuntimeException implements ApiExceptionInterface {
    private final String code = "PRAGUE_INVALID_FORMAT";
    private String message;

    public PragueInvalidFormat(String message) {
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
        return HttpStatus.BAD_REQUEST;
    }
}
