package com.controlemanutencao.controller;

import com.controlemanutencao.model.Cliente;
import com.controlemanutencao.model.Response;
import com.controlemanutencao.model.request.LoginRequest;
import com.controlemanutencao.model.request.RegisterRequest;
import com.controlemanutencao.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Response<Cliente>> login(@RequestBody LoginRequest in) {
        // Implementar lógica de login com JWT HTTP-ONLY
        return null;
    }

    @PostMapping("/register")
    public ResponseEntity<Response<?>> register(@RequestBody RegisterRequest in) {
        // Implementar lógica de register
        return null;
    }


}
