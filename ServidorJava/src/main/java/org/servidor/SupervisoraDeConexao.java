package org.servidor;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.*;
import java.util.*;

public class SupervisoraDeConexao extends Thread {

    private Socket conexao;
    private ArrayList<Parceiro> usuarios;

    public SupervisoraDeConexao(Socket conexao, ArrayList<Parceiro> usuarios) throws Exception {
        if (conexao == null)
            throw new Exception("Conexao ausente");
        if (usuarios == null)
            throw new Exception("Usuarios ausentes");

        this.conexao = conexao;
        this.usuarios = usuarios;
    }

    @Override
    public void run() {
        BufferedReader entrada = null;
        PrintWriter saida = null;

        try {
            System.out.println("[SERVIDOR] Nova conexão de: " +
                    conexao.getInetAddress().getHostAddress());

            // Criar streams de String
            entrada = new BufferedReader(
                    new InputStreamReader(conexao.getInputStream())
            );
            saida = new PrintWriter(
                    conexao.getOutputStream(), true
            );

            System.out.println("[SERVIDOR] Aguardando email...");

            // Ler o email enviado
            String email = entrada.readLine();
            System.out.println("[SERVIDOR] Email recebido: " + email);

            if (email != null && !email.isEmpty()) {
                // Validar o email
                boolean isValido = validarEmail(email);
                System.out.println("[SERVIDOR] Email válido? " + isValido);

                // Enviar resposta (true ou false)
                saida.println(isValido);
                System.out.println("[SERVIDOR] Resposta enviada: " + isValido);
            } else {
                saida.println("false");
            }

        } catch (Exception erro) {
            System.err.println("[SERVIDOR] Erro: " + erro.getMessage());
            erro.printStackTrace();
        } finally {
            try {
                if (entrada != null) entrada.close();
                if (saida != null) saida.close();
                if (!conexao.isClosed()) conexao.close();
                System.out.println("[SERVIDOR] Conexão fechada");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private boolean validarEmail(String email) {
        // Validação simples de email
        return email.contains("@") && email.contains(".");
    }
}

