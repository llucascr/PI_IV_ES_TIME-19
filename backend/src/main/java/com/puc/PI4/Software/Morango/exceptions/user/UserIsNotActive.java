package com.puc.PI4.Software.Morango.exceptions.user;

import com.puc.PI4.Software.Morango.exceptions.ApiExceptionInterface;
import org.springframework.http.HttpStatus;

public class UserIsNotActive extends RuntimeException implements ApiExceptionInterface {

    private final String code = "USER_IS_NOT_ACTIVE";
    private String message;

    public UserIsNotActive(String message) {
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
