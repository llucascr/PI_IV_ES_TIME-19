package com.puc.PI4.Software.Morango.exceptions.record;

import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class RecordExceptionHandler {
    @ExceptionHandler(RecordNotFound.class)
    public ProblemDetail recordNotFound(RecordNotFound e) {
        ProblemDetail problem = ProblemDetail.forStatus(e.getHttpStatus());
        problem.setTitle(e.getCode());
        problem.setDetail(e.getMessage());
        return problem;
    }
}
