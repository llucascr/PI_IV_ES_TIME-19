package com.puc.PI4.Software.Morango.exceptions;

import org.springframework.http.HttpStatus;

public interface ApiExceptionInterface {
    String getCode();
    String getMessage();
    HttpStatus getHttpStatus();
}
