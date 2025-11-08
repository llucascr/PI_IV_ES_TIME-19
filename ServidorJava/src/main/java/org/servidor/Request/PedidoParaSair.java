package org.servidor.Request;

import org.servidor.Comunicado;

public class PedidoParaSair implements Comunicado {

    @Override
    public String toString() {
        return "Desconectar";
    }
}