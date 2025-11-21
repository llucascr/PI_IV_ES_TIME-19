package org.servidor.request;

import org.servidor.model.Command;

public class CPFFormatRequest implements Command {

    private String cpf;

    public CPFFormatRequest(String cpf) {
        this.cpf = cpf;
    }

    public String getCPF() {
        return this.cpf;
    }

    public String formatCPF() {
        if (cpf == null) {
            return null;
        }

        String cpfDigits = cpf.replaceAll("\\D", "");

        if (cpfDigits.length() != 11) {
            return cpf;
        }

        return cpfDigits.substring(0, 3) + "." +
                cpfDigits.substring(3, 6) + "." +
                cpfDigits.substring(6, 9) + "-" +
                cpfDigits.substring(9, 11);
    }

    @Override
    public String toString() {
        return "Formatar CPF: " + this.cpf;
    }
}
