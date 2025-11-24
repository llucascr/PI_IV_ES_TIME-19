package org.servidor.utility;

import org.servidor.model.Command;

public class CNPJFormat implements Command {

    private String cnpj;

    public CNPJFormat(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getCNPJ() {
        return this.cnpj;
    }

    @Override
    public String toString() {
        return "Formatar CNPJ: " + this.cnpj;
    }
}