package com.controlemanutencao.controller;

import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.model.Response;
import com.controlemanutencao.model.request.LoginRequest;
import com.controlemanutencao.model.request.RegisterRequest;
import com.controlemanutencao.service.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Objects;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;
    private final MailService mailService;
    private final JwtService jwtService;
    private final UsuarioService usuarioService;

    public AuthController(AuthService authService, MailService mailService, UsuarioService usuarioService, JwtService jwtService) {
        this.authService = authService;
        this.mailService = mailService;
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<Response<?>> login(@RequestBody LoginRequest in, HttpServletResponse response) {
        // Implementar lógica de login com JWT HTTP-ONLY

        Optional<Usuario> user = usuarioService.findByLogin(in.email(), in.password());

        if(!user.isPresent()) {
            return ResponseEntity.ofNullable(new Response<>(HttpStatus.UNAUTHORIZED.value(), "Verifique as credenciais.", null));
        }

        String token = jwtService.generateToken(user.get());
        Cookie cookie = new Cookie("JWT_TOKEN", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) Duration.ofDays(2).toSeconds());
        response.addCookie(cookie);

        return ResponseEntity.ofNullable(new Response<>(HttpStatus.OK.value(), "Login realizado com sucesso!", null));
    }

    @PostMapping("/autocadastro")
    public ResponseEntity<Response<Usuario>> register(@RequestBody @Validated RegisterRequest in) {
        // Implementar lógica de register

        Usuario usuario = new Usuario(
                0,
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
