package org.servidor.response;

import org.servidor.model.Command;

public class ShutdownResponse implements Command {

    @Override
    public String toString() {
        return "Servidor desligando";
    }
}