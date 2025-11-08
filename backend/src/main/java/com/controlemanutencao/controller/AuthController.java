package com.controlemanutencao.controller;

import com.controlemanutencao.dto.UsuarioDTO;
import com.controlemanutencao.model.EnderecoViaCep;
import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.model.Response;
import com.controlemanutencao.model.enums.TipoUsuario;
import com.controlemanutencao.model.request.LoginRequest;
import com.controlemanutencao.model.request.AutoCadastroRequest;
import com.controlemanutencao.service.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final JwtService jwtService;
    private final ViaCEPService viaCEPService;
    private final UsuarioService usuarioService;

    public AuthController(UsuarioService usuarioService, JwtService jwtService, ViaCEPService viaCEPService) {
        this.usuarioService = usuarioService;
        this.jwtService = jwtService;
        this.viaCEPService = viaCEPService;
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        ResponseCookie cookie = ResponseCookie.from("JWT_TOKEN", null)
                .maxAge(0)
                .path("/")
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .build();
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body("");

    }

    @PostMapping("/login")
    public Response<UsuarioDTO> login(@RequestBody LoginRequest in, HttpServletResponse response) {
        Optional<Usuario> user = usuarioService.findByLogin(in.email(), in.password());

        if(user.isEmpty()) {
            return new Response<>(HttpStatus.UNAUTHORIZED.value(), "Verifique as credenciais.", null);
        }

        String token = jwtService.generateToken(user.get());
        Cookie cookie = new Cookie("JWT_TOKEN", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) Duration.ofDays(2).getSeconds());

        String cookieHeader = String.format("%s=%s; Path=%s; Max-Age=%d; HttpOnly; Secure; SameSite=None",
                cookie.getName(), cookie.getValue(), cookie.getPath(), cookie.getMaxAge());
        response.addHeader("Set-Cookie", cookieHeader);

        return new Response<>(HttpStatus.OK.value(), "Login realizado com sucesso!", UsuarioDTO.from(user.get()));
    }

    @PostMapping("/autocadastro")
    public Response<UsuarioDTO> register(@RequestBody @Validated AutoCadastroRequest in, HttpServletResponse response) {

        Usuario u;
        try {
            u = usuarioService.autocadastro(in);
        } catch (RuntimeException ex) {
            throw ex;
        }

        String token = jwtService.generateToken(u);
        Cookie cookie = new Cookie("JWT_TOKEN", token);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge((int) Duration.ofDays(2).getSeconds());

        String cookieHeader = String.format("%s=%s; Path=%s; Max-Age=%d; HttpOnly; Secure; SameSite=None",
                cookie.getName(), cookie.getValue(), cookie.getPath(), cookie.getMaxAge());
        response.addHeader("Set-Cookie", cookieHeader);

        return new Response<>(HttpStatus.OK.value(), "Cadastrado com sucesso! A senha foi enviada para seu e-mail.", UsuarioDTO.from(u));
    }


}
