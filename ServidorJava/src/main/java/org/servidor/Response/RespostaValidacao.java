package org.servidor.Response;

import org.servidor.Comunicado;

public class RespostaValidacao implements Comunicado {

    private boolean valido;
    private String mensagem;

    public RespostaValidacao(boolean valido, String mensagem) {
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