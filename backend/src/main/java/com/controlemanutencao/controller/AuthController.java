package com.controlemanutencao.controller;

import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.model.Response;
import com.controlemanutencao.model.request.LoginRequest;
import com.controlemanutencao.model.request.RegisterRequest;
import com.controlemanutencao.service.AuthService;
import com.controlemanutencao.service.MailService;
import com.controlemanutencao.service.SolicitacaoService;
import com.controlemanutencao.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final MailService mailService;
    private final UsuarioService usuarioService;

    public AuthController(AuthService authService, MailService mailService, UsuarioService usuarioService) {
        this.authService = authService;
        this.mailService = mailService;
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public ResponseEntity<Response<Usuario>> login(@RequestBody LoginRequest in) {
        // Implementar lógica de login com JWT HTTP-ONLY
        return null;
    }

    @PostMapping("/autocadastro")
    public ResponseEntity<Response<Usuario>> register(@RequestBody @Validated RegisterRequest in) {
        // Implementar lógica de register

        Usuario usuario = new Usuario(
                null,
                in.nome(),
                in.email(),
                in.telefone(),
                in.cpf(),
                in.cidade(),
                in.estado(),
                in.rua(),
                in.bairro(),
                in.numero(),
                in.cep()
        );

        try {
            usuarioService.criarUsuario(usuario);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return null;
    }


}
