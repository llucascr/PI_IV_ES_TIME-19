package org.servidor.Request;

import org.servidor.Comunicado;

public class PedidoDeFormatacaoCPF implements Comunicado {

    private String cpf;

    public PedidoDeFormatacaoCPF(String cpf) {
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