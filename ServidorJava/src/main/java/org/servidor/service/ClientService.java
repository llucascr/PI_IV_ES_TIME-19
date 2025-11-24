package org.servidor.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.servidor.utility.EmailValidation;

import java.util.HashMap;
import java.util.Map;

public class ClientService {

    public String validarEmail(String email) throws JsonProcessingException {
        boolean isValido = EmailValidation.isValid(email);
        Map<String, Object> response = new HashMap<>();
        response.put("tipo", "validarEmail");
        response.put("valido", isValido);
        return new ObjectMapper().writeValueAsString(response);
    }

    public String formatarCPF(String cpf) throws JsonProcessingException {
        // Remover caracteres não numéricos
        String cpfLimpo = cpf.replaceAll("[^0-9]", "");

        // Validar se tem 11 dígitos
        if (cpfLimpo.length() != 11) {
            Map<String, Object> response = new HashMap<>();
            response.put("tipo", "validarCPF");
            response.put("valido", false);
            response.put("erro", "CPF deve conter exatamente 11 dígitos");
            return new ObjectMapper().writeValueAsString(response);
        }

        // Validar se não é sequência de números iguais
        if (cpfLimpo.matches("(\\d)\\1{10}")) {
            Map<String, Object> response = new HashMap<>();
            response.put("tipo", "validarCPF");
            response.put("valido", false);
            response.put("erro", "CPF não pode ser formado por dígitos repetidos");
            return new ObjectMapper().writeValueAsString(response);
        }

        // Validar dígitos verificadores
        if (!validarDigitosVerificadores(cpfLimpo)) {
            Map<String, Object> response = new HashMap<>();
            response.put("tipo", "validarCPF");
            response.put("valido", false);
            response.put("erro", "Dígitos verificadores inválidos");
            return new ObjectMapper().writeValueAsString(response);
        }

        // Formatar CPF (XXX.XXX.XXX-XX)
        String cpfFormatado = cpfLimpo.replaceAll(
                "(\\d{3})(\\d{3})(\\d{3})(\\d{2})",
                "$1.$2.$3-$4"
        );

        // Retornar resposta formatada
        Map<String, Object> response = new HashMap<>();
        response.put("tipo", "validarCPF");
        response.put("valido", true);
        response.put("cpf", cpfFormatado);
        response.put("cpfSemFormatacao", cpfLimpo);

        return new ObjectMapper().writeValueAsString(response);
    }

    /**
     * Valida os dígitos verificadores do CPF
     * Algoritmo conforme normas da Receita Federal do Brasil[79]
     */
    private boolean validarDigitosVerificadores(String cpf) {
        // Calcular primeiro dígito verificador
        int soma = 0;
        for (int i = 0; i < 9; i++) {
            soma += (cpf.charAt(i) - '0') * (10 - i);
        }

        int resto = soma % 11;
        int primeiroDigito = (resto < 2) ? 0 : (11 - resto);

        // Calcular segundo dígito verificador
        soma = 0;
        for (int i = 0; i < 10; i++) {
            soma += (cpf.charAt(i) - '0') * (11 - i);
        }

        resto = soma % 11;
        int segundoDigito = (resto < 2) ? 0 : (11 - resto);

        // Validar se os dígitos calculados correspondem aos informados
        return (primeiroDigito == (cpf.charAt(9) - '0')) &&
                (segundoDigito == (cpf.charAt(10) - '0'));
    }

}
