package com.puc.PI4.Software.Morango.exceptions.record;

import com.puc.PI4.Software.Morango.exceptions.ApiExceptionInterface;
import org.springframework.http.HttpStatus;

public class RecordNotFound extends RuntimeException implements ApiExceptionInterface {
    private final String code = "RECORD_NOT_FOUND";
    private String message;

    public RecordNotFound(String message) {
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
