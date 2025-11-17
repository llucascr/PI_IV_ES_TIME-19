package org.servidor.request;

import org.servidor.model.Command;

public class PasswordEncryptionRequest implements Command {

    private String senha;

    public PasswordEncryptionRequest(String senha) {
        this.senha = senha;
    }

    public String getSenha() {
        return this.senha;
    }

    @Override
    public String toString() {
        return "Criptografar Senha";
    }
}