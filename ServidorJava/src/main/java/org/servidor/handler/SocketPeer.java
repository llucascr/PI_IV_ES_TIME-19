package org.servidor.handler;

import org.servidor.model.Command;

import java.io.*;
import java.net.*;
import java.util.concurrent.Semaphore;

public class SocketPeer {

    private Socket connection;
    private ObjectInputStream inputStream;
    private ObjectOutputStream outputStream;
    private Command nextCommand = null;
    private Semaphore mutEx = new Semaphore(1, true);

    public SocketPeer(Socket connection, ObjectInputStream inputStream, ObjectOutputStream outputStream)
            throws Exception {

        if (connection == null)
            throw new Exception("Conexao ausente");
        if (inputStream == null)
            throw new Exception("Receptor ausente");
        if (outputStream == null)
            throw new Exception("Transmissor ausente");

        this.connection = connection;
        this.inputStream = inputStream;
        this.outputStream = outputStream;
    }

    public void send(Command x) throws Exception {

        try {
            this.outputStream.writeObject(x);
            this.outputStream.flush();
        } catch (IOException erro) {
            throw new Exception("Erro de transmissao");
        }
    }

    public Command receive() throws Exception {

        try {
            this.mutEx.acquireUninterruptibly();
            if (this.nextCommand == null) {
                this.nextCommand = (Command) this.inputStream.readObject();
            }
            this.mutEx.release();
            return this.nextCommand;
        } catch (Exception erro) {
            throw new Exception("Erro de recepcao");
        }
    }

    public Command send() throws Exception {

        try {
            if (this.nextCommand == null) {
                this.nextCommand = (Command) this.inputStream.readObject();
            }
            Command ret = this.nextCommand;
            this.nextCommand = null;
            return ret;
        } catch (Exception erro) {
            throw new Exception("Erro de recepcao");
        }
    }

    public void disconnect() throws Exception {

        try {
            this.outputStream.close();
            this.inputStream.close();
            this.connection.close();
        } catch (Exception erro) {
            throw new Exception("Erro de desconexao");
        }
    }
}
