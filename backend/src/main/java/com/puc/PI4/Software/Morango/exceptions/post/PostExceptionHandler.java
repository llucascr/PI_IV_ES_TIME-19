package com.puc.PI4.Software.Morango.exceptions.post;

import com.puc.PI4.Software.Morango.exceptions.user.UserAlreadyExist;
import com.puc.PI4.Software.Morango.exceptions.user.UserNotFound;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PostExceptionHandler {
    @ExceptionHandler(UserAlreadyExist.class)
    public ProblemDetail postNotFound(PostNotFound e) {
        ProblemDetail problem = ProblemDetail.forStatus(e.getHttpStatus());
        problem.setTitle(e.getCode());
        problem.setDetail(e.getMessage());
        return problem;
    }

}
