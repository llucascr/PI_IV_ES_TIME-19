package com.puc.PI4.Software.Morango.exceptions.user;

import com.puc.PI4.Software.Morango.exceptions.ApiExceptionInterface;
import org.springframework.http.HttpStatus;

public class UserAlreadyExist extends RuntimeException implements ApiExceptionInterface {

    private final String code = "USER_ALREADY_EXIST";
    private String message;

    public UserAlreadyExist(String message) {
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
