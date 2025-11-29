package com.puc.PI4.Software.Morango.exceptions.organization;

import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class OrganizationExceptionHandler {

    @ExceptionHandler(OrganizationNotFound.class)
    public ProblemDetail organizationNotFound(OrganizationNotFound e) {
        ProblemDetail problem = ProblemDetail.forStatus(e.getHttpStatus());
        problem.setTitle(e.getCode());
        problem.setDetail(e.getMessage());
        return problem;
    }

    @ExceptionHandler(OrganizationAlreadyExist.class)
    public ProblemDetail organizationAlreadyExist(OrganizationAlreadyExist e) {
        ProblemDetail problem = ProblemDetail.forStatus(e.getHttpStatus());
        problem.setTitle(e.getCode());
        problem.setDetail(e.getMessage());
        return problem;
    }

    @ExceptionHandler(OrganizationIsNotActive.class)
    public ProblemDetail organizationIsNotActive(OrganizationIsNotActive e) {
        ProblemDetail problem = ProblemDetail.forStatus(e.getHttpStatus());
        problem.setTitle(e.getCode());
        problem.setDetail(e.getMessage());
        return problem;
    }

    @ExceptionHandler(CnpjInvalid.class)
    public ProblemDetail organizationIsNotActive(CnpjInvalid e) {
        ProblemDetail problem = ProblemDetail.forStatus(e.getHttpStatus());
        problem.setTitle(e.getCode());
        problem.setDetail(e.getMessage());
        return problem;
    }

}
