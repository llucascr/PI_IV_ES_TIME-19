package org.servidor.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.mindrot.jbcrypt.BCrypt;
import org.servidor.utility.CPFFormat;
import org.servidor.utility.EmailValidation;
import org.servidor.utility.CNPJFormat;
import org.servidor.utility.PasswordEncryption;

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

    public String generateHashPassword(String password) throws JsonProcessingException {
        String hash = PasswordEncryption.generateHash(password);

        Map<String, Object> response = new HashMap<>();
        response.put("tipo", "criptografarSenha");
        response.put("hash", hash);
        return new ObjectMapper().writeValueAsString(response);
    }

    public String validarSenha(Object dados) throws JsonProcessingException {
        if (!(dados instanceof Map)) {
            return "{\"erro\":\"dados deve ser um objeto JSON contendo password e savedHash\"}";
        }

        Map<?, ?> rawMap = (Map<?, ?>) dados;

        Object passObj = rawMap.get("password");
        Object hashObj = rawMap.get("savedHash");

        if (passObj == null || hashObj == null) {
            return "{\"erro\":\"Campos necessários: password e savedHash\"}";
        }

        Boolean isValido = PasswordEncryption.isValid(passObj.toString(), hashObj.toString());

        Map<String, Object> response = new HashMap<>();
        response.put("tipo", "validarSenha");
        response.put("valido", isValido);
        return new ObjectMapper().writeValueAsString(response);
    }

    public String formatarCNPJ(String cnpj) throws JsonProcessingException {
        boolean isValido = CNPJFormat.isValid(cnpj);
        String resposta = "-1";
        if (isValido) {
            resposta = CNPJFormat.formatarCNPJ(cnpj);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("tipo", "formatarCNPJ");
        response.put("formatado", resposta);
        return new ObjectMapper().writeValueAsString(response);
    }

    public String formatarCPF(String cpf) throws JsonProcessingException {
        boolean isValido = CPFFormat.isValid(cpf);
        String resposta = "-1";
        if (isValido) {
            resposta = CPFFormat.formatarCPF(cpf);
        }
        Map<String, Object> response = new HashMap<>();
        response.put("tipo", "formatarCPF");
        response.put("formatado", resposta);
        return new ObjectMapper().writeValueAsString(response);
    }
}
