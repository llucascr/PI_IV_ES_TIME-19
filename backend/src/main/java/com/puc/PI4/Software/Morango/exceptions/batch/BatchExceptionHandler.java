package com.puc.PI4.Software.Morango.exceptions.batch;

import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class BatchExceptionHandler {

    @ExceptionHandler(BatchNotFound.class)
    public ProblemDetail batchNotFound(BatchNotFound e) {
        ProblemDetail problem = ProblemDetail.forStatus(e.getHttpStatus());
        problem.setTitle(e.getCode());
        problem.setDetail(e.getMessage());
        return problem;
    }

}
