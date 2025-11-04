package com.controlemanutencao.controller;

import com.controlemanutencao.dto.UsuarioDTO;
import com.controlemanutencao.model.Response;
import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.model.request.AtualizarFuncionarioRequest;
import com.controlemanutencao.model.request.CriarFuncionarioRequest;
import com.controlemanutencao.service.UsuarioService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping
    public Response<List<UsuarioDTO>> listar() {
        return new Response<>(200, "", service.findAll().stream().map(UsuarioDTO::from).toList());
    }

    @GetMapping("/funcionario")
    public Response<List<UsuarioDTO>> listarFuncionarios() {
        return new Response<>(200, "", service.findFuncionarios().stream().map(UsuarioDTO::from).toList());
    }

    @PostMapping
    public Response<?> criarFuncionario(@AuthenticationPrincipal Usuario user, @RequestBody CriarFuncionarioRequest in) {
        service.criarFuncionario(user, in);
        return new Response<>(200, "Funcionário criado com sucesso!", null);
    }

    @PutMapping("/{id}")
    public Response<?> atualizarFuncionario(@PathVariable("id") Long id, @AuthenticationPrincipal Usuario user, @RequestBody AtualizarFuncionarioRequest in) {
        service.atualizarFunctionario(user, id, in);
        return new Response<>(200, "Funcionário atualizado com sucesso!", null);
    }

    @DeleteMapping("/{id}")
    public Response<?> deletarFuncionario(@AuthenticationPrincipal Usuario user, @PathVariable("id") Long id) {
        service.inativarUsuario(user, id);
        return new Response<>(200, "Usuário inativado com sucesso!", null);
    }

    @GetMapping("/{id}")
    public Response<UsuarioDTO> buscarUsuario(@AuthenticationPrincipal Usuario user, @PathVariable("id") Long id) {
        Usuario usr = service.buscarUsuario(user, id);
        return new Response<>(200, "", UsuarioDTO.from(usr));
    }

}
