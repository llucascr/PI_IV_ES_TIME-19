package org.servidor.handler;

import java.net.*;
import java.util.*;

public class ConnectionAcceptor extends Thread {

    private ServerSocket request;
    private ArrayList<SocketPeer> users;

    public ConnectionAcceptor(String porta, ArrayList<SocketPeer> users) throws Exception {

        if (porta == null)
            throw new Exception("Porta ausente");

        try {
            this.request = new ServerSocket(Integer.parseInt(porta));
        } catch (Exception erro) {
            throw new Exception("Porta invalida");
        }

        if (users == null)
            throw new Exception("Usuarios ausentes");

        this.users = users;
    }

    @Override
    public void run() {

        for (;;) {
            Socket conexao = null;
            try {
                conexao = this.request.accept();
            } catch (Exception erro) {
                continue;
            }

            ClientHandler clientHandler = null;
            try {
                clientHandler = new ClientHandler(conexao, users);
            } catch (Exception erro) {
            }

            clientHandler.start();
        }
    }
}
