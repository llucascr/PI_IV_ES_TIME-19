package org.servidor.Response;

import org.servidor.Comunicado;

public class RespostaFormatacao implements Comunicado {

    private String dado;
    private String tipo;

    public RespostaFormatacao(String dado, String tipo) {
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