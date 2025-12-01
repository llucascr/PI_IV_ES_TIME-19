package com.puc.PI4.Software.Morango.exceptions.prague;

import com.puc.PI4.Software.Morango.exceptions.post.PostNotFound;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PragueExceptionHandler {
    @ExceptionHandler(PragueAlreadyExists.class)
    public ProblemDetail pragueAlreadyExists(PragueAlreadyExists e) {
        ProblemDetail problem = ProblemDetail.forStatus(e.getHttpStatus());
        problem.setTitle(e.getCode());
        problem.setDetail(e.getMessage());
        return problem;
    }

    @ExceptionHandler(PragueNotFound.class)
    public ProblemDetail pragueNotFound(PragueNotFound e) {
        ProblemDetail problem = ProblemDetail.forStatus(e.getHttpStatus());
        problem.setTitle(e.getCode());
        problem.setDetail(e.getMessage());
        return problem;
    }

    @ExceptionHandler(PragueInvalidFormat.class)
    public ProblemDetail pragueInvalidFormat(PragueInvalidFormat e) {
        ProblemDetail problem = ProblemDetail.forStatus(e.getHttpStatus());
        problem.setTitle(e.getCode());
        problem.setDetail(e.getMessage());
        return problem;
    }
}
