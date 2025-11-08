package org.servidor;

import java.io.IOException;

public class Servidor {

    public static String PORTA_HTTP_PADRAO = "4000";

    public static void main(String[] args) {

        if (args.length > 1) {
            System.err.println("Uso esperado: java Servidor [PORTA_HTTP]\n");
            return;
        }

        String portaHttp = PORTA_HTTP_PADRAO;

        if (args.length == 1) {
            portaHttp = args[0];
        }

        // Iniciar Servidor HTTP
        ServidorHTTP servidorHttp = null;
        try {
            servidorHttp = new ServidorHTTP(Integer.parseInt(portaHttp));
            servidorHttp.start();
            System.out.println("✅ Servidor HTTP iniciado na porta " + portaHttp);
        } catch (IOException erro) {
            System.err.println("❌ Erro ao iniciar servidor HTTP: " + erro.getMessage());
            System.err.println("Escolha uma porta apropriada e liberada para uso!");
            return;
        } catch (NumberFormatException erro) {
            System.err.println("❌ Porta inválida: " + portaHttp);
            return;
        }

        // Loop principal - aguarda comando para desativar
        for(;;) {
            System.out.println("\n════════════════════════════════════════");
            System.out.println("  🟢 SERVIDOR ATIVO NA PORTA " + portaHttp);
            System.out.println("════════════════════════════════════════");
            System.out.println("\nEndpoints disponíveis:");
            System.out.println("  POST http://localhost:" + portaHttp + "/validar-email");
            System.out.println("  POST http://localhost:" + portaHttp + "/criptografar-senha");
            System.out.println("  POST http://localhost:" + portaHttp + "/formatar-cpf");
            System.out.println("  POST http://localhost:" + portaHttp + "/formatar-cnpj");
            System.out.println("  GET  http://localhost:" + portaHttp + "/health");
            System.out.println("\nDigite 'desativar' para parar o servidor");
            System.out.print("\n> ");

            String comando = null;
            try {
                comando = Teclado.getUmString();
            } catch (Exception erro) {
                System.err.println("Erro ao ler comando: " + erro.getMessage());
            }

            if (comando != null && comando.toLowerCase().equals("desativar")) {
                System.out.println("\n🛑 Desativando servidor...");

                if (servidorHttp != null) {
                    try {
                        servidorHttp.stop();
                        System.out.println("✅ Servidor HTTP parado");
                    } catch (Exception e) {
                        System.err.println("⚠️  Erro ao parar servidor: " + e.getMessage());
                    }
                }

                System.out.println("👋 Servidor desativado. Até logo!");
                System.exit(0);
            } else {
                System.out.println("⚠️  Comando desconhecido. Digite 'desativar' para parar o servidor.");
            }
        }
    }
}