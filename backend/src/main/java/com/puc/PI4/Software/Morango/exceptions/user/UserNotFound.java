package com.puc.PI4.Software.Morango.exceptions.user;

import com.puc.PI4.Software.Morango.exceptions.ApiExceptionInterface;
import org.springframework.http.HttpStatus;

public class UserNotFound extends RuntimeException implements ApiExceptionInterface {

    private final String code = "USER_NOT_FOUND";
    private String message;

    public UserNotFound(String message) {
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
