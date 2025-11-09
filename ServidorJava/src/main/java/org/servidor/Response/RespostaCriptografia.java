package org.servidor.Response;

import org.servidor.Comunicado;

public class RespostaCriptografia implements Comunicado {

    private String senhaCriptografada;

    public RespostaCriptografia(String senhaCriptografada) {
        this.senhaCriptografada = senhaCriptografada;
    }

    public String getSenhaCriptografada() {
        return this.senhaCriptografada;
    }

    @Override
    public String toString() {
        return "Senha Criptografada: " + this.senhaCriptografada;
    }
}