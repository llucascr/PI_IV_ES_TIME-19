package com.puc.PI4.Software.Morango.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.net.Socket;

@RestController
@RequestMapping("api/v1/socket")
public class SocketController {

    @PostMapping("/validar-email")
    public ResponseEntity<String> validarEmail(@RequestParam String email) {
        try (Socket socket = new Socket("localhost", 3000);
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
             BufferedReader in = new BufferedReader(
                     new InputStreamReader(socket.getInputStream()))) {

            // Enviar email
            System.out.println("[CLIENTE] Enviando email: " + email);
            out.println(email);

            // Receber resposta (true ou false)
            String resposta = in.readLine();
            System.out.println("[CLIENTE] Resposta recebida: " + resposta);

            boolean isValido = Boolean.parseBoolean(resposta);

            return ResponseEntity.ok(
                    "{\"email\":\"" + email + "\",\"valido\":" + isValido + "}"
            );

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(
                    "{\"erro\":\"" + e.getMessage() + "\"}"
            );
        }
    }
}
