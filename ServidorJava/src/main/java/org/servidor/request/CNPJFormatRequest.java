package org.servidor.request;

import org.servidor.model.Command;

public class CNPJFormatRequest implements Command {

    private String cnpj;

    public CNPJFormatRequest(String cnpj) {
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