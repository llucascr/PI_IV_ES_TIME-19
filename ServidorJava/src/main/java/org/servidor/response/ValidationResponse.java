package org.servidor.response;

import org.servidor.model.Command;

public class ValidationResponse implements Command {

    private boolean valido;
    private String mensagem;

    public ValidationResponse(boolean valido, String mensagem) {
        this.valido = valido;
        this.mensagem = mensagem;
    }

    public boolean isValido() {
        return this.valido;
    }

    public String getMensagem() {
        return this.mensagem;
    }

    @Override
    public String toString() {
        return (this.valido ? "Válido" : "Inválido") + ": " + this.mensagem;
    }
}