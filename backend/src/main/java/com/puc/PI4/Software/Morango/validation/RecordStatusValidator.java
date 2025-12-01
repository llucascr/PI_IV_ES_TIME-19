package com.puc.PI4.Software.Morango.validation;

import com.puc.PI4.Software.Morango.dto.enums.RecordStatus;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.Arrays;

public class RecordStatusValidator implements ConstraintValidator<ValidRecordStatus, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null || value.isBlank()) {
            return false;
        }
        return Arrays.stream(RecordStatus.values())
                .anyMatch(status -> status.getStatus().equalsIgnoreCase(value));
    }
}