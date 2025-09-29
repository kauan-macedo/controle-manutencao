package com.controlemanutencao.controller;

import com.controlemanutencao.exception.EmailAlreadyTakenException;
import com.controlemanutencao.model.EnderecoViaCep;
import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.model.Response;
import com.controlemanutencao.model.request.LoginRequest;
import com.controlemanutencao.model.request.RegisterRequest;
import com.controlemanutencao.service.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.Email;
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
    private final ViaCEPService viaCEPService;
    private final UsuarioService usuarioService;

    public AuthController(AuthService authService, MailService mailService, UsuarioService usuarioService, JwtService jwtService, ViaCEPService viaCEPService) {
        this.authService = authService;
        this.mailService = mailService;
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
        this.viaCEPService = viaCEPService;
    }

    @PostMapping("/login")
    public ResponseEntity<Response<Usuario>> login(@RequestBody LoginRequest in, HttpServletResponse response) {
        Optional<Usuario> user = usuarioService.findByLogin(in.email(), in.password());

        if(user.isEmpty()) {
            return ResponseEntity.ofNullable(new Response<>(HttpStatus.UNAUTHORIZED.value(), "Verifique as credenciais.", null));
        }

        String token = jwtService.generateToken(user.get());
        Cookie cookie = new Cookie("JWT_TOKEN", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) Duration.ofDays(2).toSeconds());
        response.addCookie(cookie);

        return ResponseEntity.ofNullable(new Response<Usuario>(HttpStatus.OK.value(), "Login realizado com sucesso!", user.get()));
    }

    @PostMapping("/autocadastro")
    public ResponseEntity<Response<Usuario>> register(@RequestBody @Validated RegisterRequest in, HttpServletResponse response) {
        EnderecoViaCep enderecoViaCep = viaCEPService.buscarCEP(in.cep().replace("-", ""));

        Usuario usuario = new Usuario(
                0,
                in.nome(),
                in.email(),
                in.telefone(),
                in.cpf(),
                enderecoViaCep.localidade(),
                enderecoViaCep.estado(),
                enderecoViaCep.logradouro(),
                enderecoViaCep.bairro(),
                in.numero(),
                in.cep().replace("-", "")
        );

        try {
            usuarioService.criarUsuario(usuario);
        } catch (RuntimeException ex) {
            throw ex;
        }

        String token = jwtService.generateToken(usuario);
        Cookie cookie = new Cookie("JWT_TOKEN", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) Duration.ofDays(2).toSeconds());
        response.addCookie(cookie);

        return ResponseEntity.ofNullable(new Response<>(HttpStatus.OK.value(), "Autocadastro realizado com sucesso!", null));
    }


}
