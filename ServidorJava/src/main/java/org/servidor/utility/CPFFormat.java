package org.servidor.utility;

import org.servidor.model.Command;

public class CPFFormat implements Command {

    private String cpf;

    public CPFFormat(String cpf) {
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