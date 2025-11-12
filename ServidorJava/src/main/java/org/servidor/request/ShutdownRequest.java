package org.servidor.request;

import org.servidor.model.Command;

public class ShutdownRequest implements Command {

    @Override
    public String toString() {
        return "Desconectar";
    }
}