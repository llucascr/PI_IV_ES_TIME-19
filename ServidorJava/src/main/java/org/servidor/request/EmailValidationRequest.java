package org.servidor.request;

import org.servidor.model.Command;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailValidationRequest implements Command {

    private String email;

    private static final Pattern EMAIL_PATTERN =
            Pattern.compile("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$");

    public EmailValidationRequest(String email) {
        this.email = email;
    }

    public String getEmail() {
        return this.email;
    }

    public static boolean isValid(String email) {
        if (email == null) {
            return false;
        }

        Matcher matcher = EMAIL_PATTERN.matcher(email);
        return matcher.matches();
    }

    @Override
    public String toString() {
        return "Validar Email: " + this.email;
    }
}