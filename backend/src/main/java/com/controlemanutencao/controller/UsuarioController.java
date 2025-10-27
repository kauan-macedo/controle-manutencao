package com.controlemanutencao.controller;

import com.controlemanutencao.dto.UsuarioDTO;
import com.controlemanutencao.model.Response;
import com.controlemanutencao.model.Usuario;
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
    public List<UsuarioDTO> listar() {
        return service.findAll().stream().map(UsuarioDTO::from).toList();
    }

    @PostMapping
    public Response<?> criarFuncionario(@AuthenticationPrincipal Usuario user, @RequestBody CriarFuncionarioRequest in) {
        service.criarFuncionario(user, in);
        return new Response<>(200, "Funcionário criado com sucesso!", null);
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
