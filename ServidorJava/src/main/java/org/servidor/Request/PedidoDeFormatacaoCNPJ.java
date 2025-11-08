package org.servidor.Request;

import org.servidor.Comunicado;

public class PedidoDeFormatacaoCNPJ implements Comunicado {

    private String cnpj;

    public PedidoDeFormatacaoCNPJ(String cnpj) {
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