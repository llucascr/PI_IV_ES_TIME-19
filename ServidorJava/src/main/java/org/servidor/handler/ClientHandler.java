package org.servidor.handler;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.*;
import java.util.*;

public class ClientHandler extends Thread {

    private Socket connection;
    private ArrayList<SocketPeer> users;

    public ClientHandler(Socket connection, ArrayList<SocketPeer> users) throws Exception {
        if (connection == null)
            throw new Exception("Conexao ausente");
        if (users == null)
            throw new Exception("Usuarios ausentes");

        this.connection = connection;
        this.users = users;
    }

    @Override
    public void run() {
        BufferedReader input = null;
        PrintWriter output = null;

        try {
            System.out.println("[SERVIDOR] Nova conexão de: " +
                    connection.getInetAddress().getHostAddress());

            // Criar streams de String
            input = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            output = new PrintWriter(connection.getOutputStream(), true);

            // Ler o email enviado
            String email = input.readLine();
            System.out.println("[SERVIDOR] Email recebido: " + email);

            if (email != null && !email.isEmpty()) {
                // Validar o email
                boolean isValido = validarEmail(email);
                System.out.println("[SERVIDOR] Email válido: " + isValido);

                // Enviar resposta (true ou false)
                output.println(isValido);
                System.out.println("[SERVIDOR] Resposta enviada: " + isValido);
            } else {
                output.println("false");
            }

        } catch (Exception erro) {
            System.err.println("[SERVIDOR] Erro: " + erro.getMessage());
            erro.printStackTrace();
        } finally {
            try {
                if (input != null) input.close();
                if (output != null) output.close();
                if (!connection.isClosed()) connection.close();
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

