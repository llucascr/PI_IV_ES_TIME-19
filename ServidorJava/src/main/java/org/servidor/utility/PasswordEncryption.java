package org.servidor.utility;

import org.servidor.model.Command;

public class PasswordEncryption implements Command {

    private String senha;

    public PasswordEncryption(String senha) {
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