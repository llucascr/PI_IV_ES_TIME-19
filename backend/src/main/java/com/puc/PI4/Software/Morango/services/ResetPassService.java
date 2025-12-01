package com.puc.PI4.Software.Morango.services;

import com.puc.PI4.Software.Morango.dto.request.resetPass.ResetPassRequest;
import com.puc.PI4.Software.Morango.dto.request.resetPass.ResetPassTokenRequest;
import com.puc.PI4.Software.Morango.dto.response.resetPass.ResetPassResponse;
import com.puc.PI4.Software.Morango.infra.security.TokenService;
import com.puc.PI4.Software.Morango.models.User;
import com.puc.PI4.Software.Morango.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResetPassService {

    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    public ResetPassResponse requestReset(ResetPassRequest req) {

        Optional<User> oUser = userRepository.opFindByEmail(req.getEmail());

        if (oUser.isEmpty()) {
            return ResetPassResponse.builder()
                    .message("Se o email existir, você receberá um link.")
                    .build();
        }

        User user = oUser.get();

        String token = tokenService.generateResetToken(user.getEmail());

        user.setResetPasswordToken(token);
        user.setResetPasswordExpiration(null); // expiracao fica embutida no JWT
        userRepository.save(user);

        String resetLink = "http://localhost:3000/ResetPass/resetPassNewPass/?token=" + token;

        String html = """
                <h2>Redefinição de Senha</h2>
                <p>Você solicitou a redefinição de senha.</p>
                <p>Clique no botão abaixo para redefinir sua senha:</p>
                <p>
                    <a href="%s" 
                       style="display:inline-block;
                              background:#FFB5C0;
                              color:white;
                              padding:10px 20px;
                              text-decoration:none;
                              border-radius:5px;">
                        Resetar Senha
                    </a>
                </p>
                <p>Este link expira em 15 minutos.</p>
                """.formatted(resetLink);

        emailService.sendEmail(
                user.getEmail(),
                "Redefinição de Senha",
                html
        );

        return ResetPassResponse.builder()
                .message("Se o email existir, você receberá um link.")
                .build();
    }

    public ResetPassResponse confirmReset(ResetPassTokenRequest dto) {

        String email = tokenService.validateResetToken(dto.getToken());

        if (email == null || email.isEmpty()) {
            return ResetPassResponse.builder()
                    .message("Token inválido ou expirado.")
                    .build();
        }

        Optional<User> oUser = userRepository.opFindByEmail(email);

        if (oUser.isEmpty()) {
            return ResetPassResponse.builder()
                    .message("Usuário não encontrado.")
                    .build();
        }

        User user = oUser.get();
        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        user.setResetPasswordToken(null);
        userRepository.save(user);

        return ResetPassResponse.builder()
                .message("Senha alterada com sucesso!")
                .build();
    }
}