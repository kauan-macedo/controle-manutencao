package com.controlemanutencao.controller;

import com.controlemanutencao.dto.UsuarioDTO;
import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.service.UsuarioService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping
    public List<UsuarioDTO> listar() {
        return service.findAll().stream().map(UsuarioDTO::from).toList();
    }

}
