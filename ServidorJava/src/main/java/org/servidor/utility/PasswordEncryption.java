package org.servidor.utility;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.mindrot.jbcrypt.BCrypt;
import org.servidor.model.Command;

public class PasswordEncryption implements Command {

    public static String generateHash(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    public static boolean isValid(String password, String savedHash){
        return BCrypt.checkpw(password, savedHash);
    }

    @Override
    public String toString() {
        return "Criptografar Senha";
    }
}