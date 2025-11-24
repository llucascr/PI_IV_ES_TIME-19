package org.servidor.utility;

import org.servidor.model.Command;

import java.util.InputMismatchException;

public class CNPJFormat implements Command {

    private String cnpj;

    public CNPJFormat(String cnpj) {
        this.cnpj = cnpj;
    }

    public static boolean isValid(String CNPJ) {
        CNPJ = CNPJ.replaceAll("[^0-9]", "");
        if (CNPJ.equals("00000000000000") || CNPJ.equals("11111111111111") ||
                CNPJ.equals("22222222222222") || CNPJ.equals("33333333333333") ||
                CNPJ.equals("44444444444444") || CNPJ.equals("55555555555555") ||
                CNPJ.equals("66666666666666") || CNPJ.equals("77777777777777") ||
                CNPJ.equals("88888888888888") || CNPJ.equals("99999999999999") ||
                (CNPJ.length() != 14))
            return(false);

        char dig13, dig14;
        int sm, i, r, num, peso;

        try {
            sm = 0;
            peso = 2;
            for (i=11; i>=0; i--) {
                num = (int)(CNPJ.charAt(i) - 48);
                sm = sm + (num * peso);
                peso = peso + 1;
                if (peso == 10)
                    peso = 2;
            }

            r = sm % 11;
            if ((r == 0) || (r == 1))
                dig13 = '0';
            else dig13 = (char)((11-r) + 48);

            sm = 0;
            peso = 2;
            for (i=12; i>=0; i--) {
                num = (int)(CNPJ.charAt(i)- 48);
                sm = sm + (num * peso);
                peso = peso + 1;
                if (peso == 10)
                    peso = 2;
            }

            r = sm % 11;
            if ((r == 0) || (r == 1))
                dig14 = '0';
            else dig14 = (char)((11-r) + 48);

            if ((dig13 == CNPJ.charAt(12)) && (dig14 == CNPJ.charAt(13)))
                return(true);
            else return(false);
        } catch (InputMismatchException erro) {
            return(false);
        }
    }

    public static String formatarCNPJ(String cnpj){
        String apenasDigitos = cnpj.replaceAll("[^0-9]", "");

        try {
            return apenasDigitos.substring(0, 2) + "." +
                    apenasDigitos.substring(2, 5) + "." +
                    apenasDigitos.substring(5, 8) + "/" +
                    apenasDigitos.substring(8, 12) + "-" +
                    apenasDigitos.substring(12, 14);
        } catch (IndexOutOfBoundsException e) {
            return "-1";
        }
    }

    public String getCNPJ() {
        return this.cnpj;
    }

    @Override
    public String toString() {
        return "Formatar CNPJ: " + this.cnpj;
    }
}