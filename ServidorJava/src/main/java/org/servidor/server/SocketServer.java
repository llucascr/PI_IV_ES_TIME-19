package org.servidor.server;

import org.servidor.handler.ConnectionAcceptor;
import org.servidor.response.ShutdownResponse;
import org.servidor.handler.SocketPeer;

import java.util.*;

public class SocketServer {

    public static String PORTA_PADRAO = "3000";

    public static void main(String[] args) {

        if (args.length > 1) {
            System.err.println("Uso esperado: java Servidor [PORTA]\n");
            return;
        }

        String porta = SocketServer.PORTA_PADRAO;
        if (args.length == 1)
            porta = args[0];

        ArrayList<SocketPeer> usuarios = new ArrayList<>();

        ConnectionAcceptor connectionAcceptor = null;
        try {
            connectionAcceptor = new ConnectionAcceptor(porta, usuarios);
            connectionAcceptor.start();
        } catch (Exception erro) {
            System.err.println("Escolha uma porta apropriada e liberada para uso!\n");
            return;
        }

        for (;;) {
            System.out.println("O servidor esta ativo! Para desativa-lo,");
            System.out.println("use o comando \"desativar\"\n");
            System.out.print("> ");

            String comando = null;
            try {
                comando = ConsoleInput.getUmString();
            } catch (Exception erro) {
            }

            if (comando != null && comando.toLowerCase().equals("desativar")) {
                synchronized (usuarios) {
                    ShutdownResponse shutdownResponse =
                            new ShutdownResponse();
                    for (SocketPeer usuario : usuarios) {
                        try {
                            usuario.send(shutdownResponse);
                            usuario.disconnect();
                        } catch (Exception erro) {
                        }
                    }
                }
                System.out.println("O servidor foi desativado!\n");
                System.exit(0);
            } else {
                System.err.println("Comando invalido!\n");
            }
        }
    }
}
