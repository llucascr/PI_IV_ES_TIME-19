package org.servidor;

public class Resultado extends Comunicado
{
    private double valorResultante;

    public Resultado (double valorResultante)
    {
        this.valorResultante = valorResultante;
    }

    public double getValorResultante ()
    {
        return this.valorResultante;
    }
    
    public String toString ()
    {
		return (""+this.valorResultante);
	}

}
