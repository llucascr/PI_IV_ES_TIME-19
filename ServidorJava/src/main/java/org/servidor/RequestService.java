package org.servidor;

import com.fasterxml.jackson.databind.ObjectMapper;
import fi.iki.elonen.NanoHTTPD;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import static fi.iki.elonen.NanoHTTPD.newFixedLengthResponse;

public class RequestService {

    private final ObjectMapper objectMapper;

    public RequestService(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    /**
     * POST /validar-email
     * Body: {"email": "usuario@example.com"}
     */
    public NanoHTTPD.Response validarEmail(NanoHTTPD.IHTTPSession session) throws IOException {
        Map<String, String> dados = lerCorpoRequisicao(session);
        String email = dados.get("email");

        System.out.println("📧 Validando email: " + email);

        if (email == null || email.isEmpty()) {
            System.out.println("❌ Email não fornecido");
            return criarRespostaErro(400,
                    "{\"erro\": \"Email é obrigatório\"}");
        }

        // IMPLEMENTAR SUA LÓGICA DE VALIDAÇÃO AQUI
        // Exemplo básico:
        boolean valido = email.contains("@") && email.contains(".");

        Map<String, Object> resposta = new HashMap<>();
        resposta.put("email", email);
        resposta.put("valido", valido);
        resposta.put("mensagem", valido ? "Email válido" : "Email inválido");

        String json = objectMapper.writeValueAsString(resposta);

        System.out.println("✅ Resposta: " + (valido ? "válido" : "inválido"));

        return criarResposta(json);
    }

    /**
     * POST /criptografar-senha
     * Body: {"senha": "minhasenha"}
     */
    public NanoHTTPD.Response criptografarSenha(NanoHTTPD.IHTTPSession session) throws IOException {
        Map<String, String> dados = lerCorpoRequisicao(session);
        String senha = dados.get("senha");

        System.out.println("🔐 Criptografando senha");

        if (senha == null || senha.isEmpty()) {
            System.out.println("❌ Senha não fornecida");
            return criarRespostaErro(400,
                    "{\"erro\": \"Senha é obrigatória\"}");
        }

        // IMPLEMENTAR SUA LÓGICA DE CRIPTOGRAFIA AQUI
        // Exemplo: usar BCrypt, SHA-256, etc.
        String senhaCriptografada = "hash_" + senha.hashCode() + "_" + System.currentTimeMillis();

        Map<String, Object> resposta = new HashMap<>();
        resposta.put("senha_criptografada", senhaCriptografada);
        resposta.put("algoritmo", "exemplo");
        resposta.put("mensagem", "Senha criptografada com sucesso");

        String json = objectMapper.writeValueAsString(resposta);

        System.out.println("✅ Senha criptografada");

        return criarResposta(json);
    }

    /**
     * POST /formatar-cpf
     * Body: {"cpf": "12345678900"}
     */
    public NanoHTTPD.Response formatarCPF(NanoHTTPD.IHTTPSession session) throws IOException {
        Map<String, String> dados = lerCorpoRequisicao(session);
        String cpf = dados.get("cpf");

        System.out.println("📝 Formatando CPF: " + cpf);

        if (cpf == null || cpf.isEmpty()) {
            System.out.println("❌ CPF não fornecido");
            return criarRespostaErro(400,
                    "{\"erro\": \"CPF é obrigatório\"}");
        }

        // Remover caracteres não numéricos
        String cpfLimpo = cpf.replaceAll("[^0-9]", "");

        if (cpfLimpo.length() != 11) {
            System.out.println("❌ CPF inválido (deve ter 11 dígitos)");
            return criarRespostaErro(400,
                    "{\"erro\": \"CPF deve ter 11 dígitos\"}");
        }

        // IMPLEMENTAR SUA LÓGICA DE FORMATAÇÃO AQUI
        // Formato: XXX.XXX.XXX-XX
        String cpfFormatado = String.format("%s.%s.%s-%s",
                cpfLimpo.substring(0, 3),
                cpfLimpo.substring(3, 6),
                cpfLimpo.substring(6, 9),
                cpfLimpo.substring(9, 11)
        );

        Map<String, Object> resposta = new HashMap<>();
        resposta.put("cpf_original", cpf);
        resposta.put("cpf_formatado", cpfFormatado);
        resposta.put("tipo", "CPF");
        resposta.put("mensagem", "CPF formatado com sucesso");

        String json = objectMapper.writeValueAsString(resposta);

        System.out.println("✅ CPF formatado: " + cpfFormatado);

        return criarResposta(json);
    }

    /**
     * POST /formatar-cnpj
     * Body: {"cnpj": "12345678900123"}
     */
    public NanoHTTPD.Response formatarCNPJ(NanoHTTPD.IHTTPSession session) throws IOException {
        Map<String, String> dados = lerCorpoRequisicao(session);
        String cnpj = dados.get("cnpj");

        System.out.println("📝 Formatando CNPJ: " + cnpj);

        if (cnpj == null || cnpj.isEmpty()) {
            System.out.println("❌ CNPJ não fornecido");
            return criarRespostaErro(400,
                    "{\"erro\": \"CNPJ é obrigatório\"}");
        }

        // Remover caracteres não numéricos
        String cnpjLimpo = cnpj.replaceAll("[^0-9]", "");

        if (cnpjLimpo.length() != 14) {
            System.out.println("❌ CNPJ inválido (deve ter 14 dígitos)");
            return criarRespostaErro(400,
                    "{\"erro\": \"CNPJ deve ter 14 dígitos\"}");
        }

        // IMPLEMENTAR SUA LÓGICA DE FORMATAÇÃO AQUI
        // Formato: XX.XXX.XXX/XXXX-XX
        String cnpjFormatado = String.format("%s.%s.%s/%s-%s",
                cnpjLimpo.substring(0, 2),
                cnpjLimpo.substring(2, 5),
                cnpjLimpo.substring(5, 8),
                cnpjLimpo.substring(8, 12),
                cnpjLimpo.substring(12, 14)
        );

        Map<String, Object> resposta = new HashMap<>();
        resposta.put("cnpj_original", cnpj);
        resposta.put("cnpj_formatado", cnpjFormatado);
        resposta.put("tipo", "CNPJ");
        resposta.put("mensagem", "CNPJ formatado com sucesso");

        String json = objectMapper.writeValueAsString(resposta);

        System.out.println("✅ CNPJ formatado: " + cnpjFormatado);

        return criarResposta(json);
    }

    /**
     * Lê o corpo da requisição JSON e converte para Map
     */
    private Map<String, String> lerCorpoRequisicao(NanoHTTPD.IHTTPSession session) throws IOException {
        int contentLength = Integer.parseInt(
                session.getHeaders().getOrDefault("content-length", "0")
        );

        if (contentLength == 0) {
            return new HashMap<>();
        }

        byte[] buffer = new byte[contentLength];
        session.getInputStream().read(buffer);
        String json = new String(buffer, "UTF-8");

        System.out.println("📦 Corpo da requisição: " + json);

        @SuppressWarnings("unchecked")
        Map<String, String> dados = objectMapper.readValue(json, Map.class);
        return dados;
    }

    /**
     * Cria uma resposta HTTP de sucesso (200 OK)
     */
    public NanoHTTPD.Response criarResposta(String json) {
        NanoHTTPD.Response response = newFixedLengthResponse(json);
        response.addHeader("Content-Type", "application/json; charset=UTF-8");
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "Content-Type");
        return response;
    }

    /**
     * Cria uma resposta HTTP de erro
     */
    public NanoHTTPD.Response criarRespostaErro(int statusCode, String json) {
        NanoHTTPD.Response response = newFixedLengthResponse(
                NanoHTTPD.Response.Status.lookup(statusCode),
                "application/json; charset=UTF-8",
                json
        );
        response.addHeader("Access-Control-Allow-Origin", "*");
        return response;
    }
}
