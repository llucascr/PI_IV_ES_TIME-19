package org.servidor.response;

import org.servidor.model.Command;

public class FormatResponse implements Command {

    private String dado;
    private String tipo;

    public FormatResponse(String dado, String tipo) {
        this.dado = dado;
        this.tipo = tipo;
    }

    public String getDado() {
        return this.dado;
    }

    public String getTipo() {
        return this.tipo;
    }

    @Override
    public String toString() {
        return this.tipo + " Formatado: " + this.dado;
    }
}