package com.puc.PI4.Software.Morango.exceptions.user;

import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
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

    @ExceptionHandler(UserNotFound.class)
    public ProblemDetail handleUserNotFound(UserNotFound e) {
        ProblemDetail problem = ProblemDetail.forStatus(e.getHttpStatus());
        problem.setTitle(e.getCode());
        problem.setDetail(e.getMessage());
        return problem;
    }

    @ExceptionHandler(IncorrectUserPassword.class)
    public ProblemDetail handlerIncorrectUserPassword(IncorrectUserPassword e) {
        ProblemDetail problem = ProblemDetail.forStatus(e.getHttpStatus());
        problem.setTitle(e.getCode());
        problem.setDetail(e.getMessage());
        return problem;
    }

    @ExceptionHandler(UserNotInOrganization.class)
    public ProblemDetail hadnlerUserNotInOrganization(UserNotInOrganization e) {
        ProblemDetail problem = ProblemDetail.forStatus(e.getHttpStatus());
        problem.setTitle(e.getCode());
        problem.setDetail(e.getMessage());
        return problem;
    }

    @ExceptionHandler(UserWithoutAdminPermission.class)
    public ProblemDetail hadlerUserWithoutAdminPermission(UserWithoutAdminPermission e) {
        ProblemDetail problem = ProblemDetail.forStatus(e.getHttpStatus());
        problem.setTitle(e.getCode());
        problem.setDetail(e.getMessage());
        return problem;
    }

}
