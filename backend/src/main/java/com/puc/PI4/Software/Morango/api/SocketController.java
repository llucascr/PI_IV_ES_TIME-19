package com.puc.PI4.Software.Morango.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.Socket;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/socket")
public class SocketController {

    private final int PORTA_PADRAO = 3000;
    private final ObjectMapper mapper;

    @PostMapping("/validarEmail")
    public ResponseEntity<String> validarEmail(@RequestParam String email) {
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

            // Receber resposta
            return ResponseEntity.ok(in.readLine());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"erro\":\"" + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/formatarCpf")
    public ResponseEntity<String> formatarCpf(@RequestParam String cpf) {
        try(Socket socket = new Socket("localhost", PORTA_PADRAO)) {

            Map<String, Object> request = new HashMap<>();
            request.put("tipo", "validarCPF");
            request.put("dados", cpf);

            String jsonRequest = mapper.writeValueAsString(request);

            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            out.println(jsonRequest);

            return ResponseEntity.ok(in.readLine());

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"erro\":\"" + e.getMessage() + "\"}");
        }
    }
}
