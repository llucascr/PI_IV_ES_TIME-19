package org.servidor.utility;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.mindrot.jbcrypt.BCrypt;
import org.servidor.model.Command;

import java.util.HashMap;
import java.util.Map;

public class PasswordEncryption implements Command {

    public String generateHash(String password) throws JsonProcessingException {
        Map<String, Object> response = new HashMap<>();
        response.put("tipo", "criptografarSenha");
        response.put("password", BCrypt.hashpw(password, BCrypt.gensalt()));
        return new ObjectMapper().writeValueAsString(response);
    }

    public String validatePassword(String password, String savedHash) throws JsonProcessingException {
        Map<String, Object> response = new HashMap<>();
        response.put("tipo", "validarSenha");
        response.put("validate", BCrypt.checkpw(password, savedHash));
        return new ObjectMapper().writeValueAsString(response);
    }

    @Override
    public String toString() {
        return "Criptografar Senha";
    }
}