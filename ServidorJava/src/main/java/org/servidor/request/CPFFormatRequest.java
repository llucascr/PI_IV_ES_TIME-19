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

    @Override
    public String toString() {
        return "Formatar CPF: " + this.cpf;
    }
}