package com.puc.PI4.Software.Morango.exceptions.socket;

import com.puc.PI4.Software.Morango.exceptions.ApiExceptionInterface;
import org.springframework.http.HttpStatus;

public class ServerOffline extends RuntimeException implements ApiExceptionInterface {

    private final String code = "SERVER_OFFLINE";
    private String message;

    public ServerOffline(String message) {
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
        return HttpStatus.SERVICE_UNAVAILABLE;
    }
}
