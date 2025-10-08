package com.puc.PI4.Software.Morango.exceptions.prague;

import com.puc.PI4.Software.Morango.exceptions.ApiExceptionInterface;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

public class PragueNotFound extends RuntimeException implements ApiExceptionInterface {
    private final String code = "PRAGUE_NOT_FOUND";
    private String message;

    public PragueNotFound(String message) {
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
