package com.controlemanutencao.controller;

import com.controlemanutencao.model.Cliente;
import com.controlemanutencao.model.Response;
import com.controlemanutencao.model.input.LoginRequestInput;
import com.controlemanutencao.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private AuthService authService;

    @PostMapping("/")
    public ResponseEntity<Response<Cliente>> login(@RequestBody LoginRequestInput in) {
        // Implementar lógica de login com JWT HTTP-ONLY
        return null;
    }

}
