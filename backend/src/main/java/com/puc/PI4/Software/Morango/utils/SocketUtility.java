package com.puc.PI4.Software.Morango.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.puc.PI4.Software.Morango.exceptions.socket.ServerOffline;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Component
public class SocketUtility {

    private final int PORTA_PADRAO = 4000;
    private final ObjectMapper mapper;

    public boolean validarEmail(String email) {
        try (Socket socket = new Socket("localhost", PORTA_PADRAO)) {

            // Criar request com tipo identificador
            Map<String, Object> request = new HashMap<>();
            request.put("tipo", "validarEmail");
            request.put("dados", email);

            // Serializar para JSON
            String jsonRequest = mapper.writeValueAsString(request);

            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            // Enviar requisição
            out.println(jsonRequest);

            JsonNode responseJson = mapper.readTree(in.readLine());

            // Receber resposta
            if (responseJson.has("valido")) {
                return responseJson.get("valido").asBoolean();
            }
            return false;

        } catch (Exception e) {
            throw new ServerOffline("Server out of service.");
        }
    }

    public String formatarCpf(String cpf) {
        try(Socket socket = new Socket("localhost", PORTA_PADRAO)) {

            Map<String, Object> request = new HashMap<>();
            request.put("tipo", "validarCPF");
            request.put("dados", cpf);

            String jsonRequest = mapper.writeValueAsString(request);

            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            out.println(jsonRequest);

            return in.readLine();

        } catch (Exception e) {
            throw new ServerOffline("Server out of service.");
        }
    }

    public String criptografarSenha(String password) {
        try(Socket socket = new Socket("localhost", PORTA_PADRAO)) {

            Map<String, Object> request = new HashMap<>();
            request.put("tipo", "criptografarSenha");
            request.put("dados", password);

            String jsonRequest = mapper.writeValueAsString(request);

            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            out.println(jsonRequest);

            return in.readLine();

        } catch (Exception e) {
            throw new ServerOffline("Server out of service.");
        }
    }

    public String validarSenha(String password, String savedHash) {
        try(Socket socket = new Socket("localhost", PORTA_PADRAO)) {

            Map<String, Object> request = new HashMap<>();
            request.put("tipo", "validarSenha");

            Map<String, Object> dados = new HashMap<>();
            dados.put("password", password);
            dados.put("savedHash", savedHash);

            request.put("dados", dados);

            String jsonRequest = mapper.writeValueAsString(request);

            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            out.println(jsonRequest);

            return in.readLine();

        } catch (Exception e) {
            throw new ServerOffline("Server out of service.");
        }
    }

}
