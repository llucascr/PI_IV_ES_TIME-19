package org.servidor;

import com.fasterxml.jackson.databind.ObjectMapper;
import fi.iki.elonen.NanoHTTPD;

import java.io.IOException;

public class ServidorHTTP extends NanoHTTPD {

    private final RequestService requestService;
    
    public ServidorHTTP(int porta) throws IOException {
        super(porta);
        this.requestService = new RequestService(new ObjectMapper());
        System.out.println("🌐 Servidor HTTP configurado na porta " + porta);
    }
    
    @Override
    public Response serve(IHTTPSession session) {
        String uri = session.getUri();
        String metodo = session.getMethod().toString();
        
        System.out.println("\n📥 Requisição recebida: " + metodo + " " + uri);
        
        try {

            if (uri.equals("/validar-email") && metodo.equals("POST")) {
                return requestService.validarEmail(session);
            }

            else if (uri.equals("/criptografar-senha") && metodo.equals("POST")) {
                return requestService.criptografarSenha(session);
            }

            else if (uri.equals("/formatar-cpf") && metodo.equals("POST")) {
                return requestService.formatarCPF(session);
            }

            else if (uri.equals("/formatar-cnpj") && metodo.equals("POST")) {
                return requestService.formatarCNPJ(session);
            }

            else if (uri.equals("/health") && metodo.equals("GET")) {
                System.out.println("✅ Health check");
                return requestService.criarResposta("{\"status\": \"OK\", \"message\": \"Servidor funcionando\"}");
            }

            else {
                System.out.println("❌ Endpoint não encontrado: " + uri);
                return requestService.criarRespostaErro(404,
                    "{\"erro\": \"Endpoint não encontrado\", \"uri\": \"" + uri + "\"}");
            }
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao processar requisição: " + e.getMessage());
            e.printStackTrace();
            return requestService.criarRespostaErro(500,
                "{\"erro\": \"Erro interno do servidor\", \"mensagem\": \"" + 
                e.getMessage().replace("\"", "'") + "\"}");
        }
    }
}
