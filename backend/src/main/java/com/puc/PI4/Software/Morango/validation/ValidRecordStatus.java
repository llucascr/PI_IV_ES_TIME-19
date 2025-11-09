package com.puc.PI4.Software.Morango.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = RecordStatusValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidRecordStatus {
    String message() default "Invalid record status value";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}