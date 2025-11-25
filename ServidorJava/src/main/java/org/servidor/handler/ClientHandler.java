package org.servidor.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.servidor.service.ClientService;
import org.servidor.utility.EmailValidation;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.*;
import java.util.*;

public class ClientHandler extends Thread {

    private Socket connection;
    private ArrayList<SocketPeer> users;

    private final ObjectMapper mapper = new ObjectMapper();
    private final ClientService clientService = new ClientService();

    public ClientHandler(Socket connection, ArrayList<SocketPeer> users) throws Exception {
        if (connection == null)
            throw new Exception("Conexão ausente");
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
            System.out.println("[SERVIDOR] Nova conexão de: " + connection.getInetAddress().getHostAddress());

            input = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            output = new PrintWriter(connection.getOutputStream(), true);

            // Ler requisição JSON
            String jsonRequest = input.readLine();
            System.out.println("[SERVIDOR] Requisição recebida: " + jsonRequest);

            if (jsonRequest != null && !jsonRequest.isEmpty()) {
                // Desserializar JSON
                Map<String, Object> request = mapper.readValue(jsonRequest, Map.class);

                String tipo = (String) request.get("tipo");
                Object dados = request.get("dados");

                // Rotear para operação apropriada
                String resposta = rotearRequisicao(tipo, dados);

                output.println(resposta);
                System.out.println("[SERVIDOR] Resposta enviada: " + resposta);
            } else {
                output.println("{\"erro\":\"Requisição vazia\"}");
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

    private String rotearRequisicao(String tipo, Object dados) {
        try {
            switch(tipo) {
                case "validarEmail":
                    return clientService.validarEmail((String) dados);
                case "validarCPF":
                    return clientService.formatarCPF((String) dados);
                case "formatarCNPJ":
                    return clientService.formatarCNPJ((String) dados);

                default:
                    return "{\"erro\":\"Tipo de operação desconhecido\"}";
            }
        } catch (Exception e) {
            return "{\"erro\":\"" + e.getMessage() + "\"}";
        }
    }
}

