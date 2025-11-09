package org.servidor.Request;

import org.servidor.Comunicado;

public class PedidoDeValidacaoEmail implements Comunicado {

    private String email;

    public PedidoDeValidacaoEmail(String email) {
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