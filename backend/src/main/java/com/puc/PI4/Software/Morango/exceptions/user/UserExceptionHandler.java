package com.puc.PI4.Software.Morango.exceptions.user;

import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class UserExceptionHandler {

    @ExceptionHandler(UserAlreadyExist.class)
    public ProblemDetail handleUserAlreadyExist(UserAlreadyExist e) {
        ProblemDetail problem = ProblemDetail.forStatus(e.getHttpStatus());
        problem.setTitle(e.getCode());
        problem.setDetail(e.getMessage());
        return problem;
    }

}
