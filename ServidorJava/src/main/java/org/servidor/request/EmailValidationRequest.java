package org.servidor.request;

import org.servidor.model.Command;

public class EmailValidationRequest implements Command {

    private String email;

    public EmailValidationRequest(String email) {
        this.email = email;
    }

    public String getEmail() {
        return this.email;
    }

    @Override
    public String toString() {
        return "Validar Email: " + this.email;
    }
}