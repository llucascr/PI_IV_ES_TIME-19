package com.puc.PI4.Software.Morango.exceptions.batch;

import com.puc.PI4.Software.Morango.exceptions.ApiExceptionInterface;
import org.springframework.http.HttpStatus;

public class BatchNotFound extends RuntimeException implements ApiExceptionInterface {

    private final String code = "BATCH_NOT_FOUND";
    private String message;

    public BatchNotFound(String message) {
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
