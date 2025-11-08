package org.servidor.Request;

import org.servidor.Comunicado;

public class PedidoDeCriptografiaSenha implements Comunicado {

    private String senha;

    public PedidoDeCriptografiaSenha(String senha) {
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