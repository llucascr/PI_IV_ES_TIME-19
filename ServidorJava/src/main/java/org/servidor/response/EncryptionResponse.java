package org.servidor.response;

import org.servidor.model.Command;

public class EncryptionResponse implements Command {

    private String senhaCriptografada;

    public EncryptionResponse(String senhaCriptografada) {
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