package org.servidor.server;

import java.io.*;

public class ConsoleInput {

    private static BufferedReader teclado = new BufferedReader(new InputStreamReader(System.in));

    public static String getUmString() {
        String ret = null;
        try {
            ret = teclado.readLine();
        } catch (IOException erro) {
        }
        return ret;
    }
}
