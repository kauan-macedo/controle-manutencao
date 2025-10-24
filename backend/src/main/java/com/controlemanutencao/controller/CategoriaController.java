package com.controlemanutencao.controller;

import com.controlemanutencao.exception.RecursoNaoEncontradoException;
import com.controlemanutencao.model.Categoria;
import com.controlemanutencao.model.Response;
import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.model.request.NovaCategoriaRequest;
import com.controlemanutencao.service.CategoriaService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {

    private final CategoriaService service;

    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    @PostMapping
    public Response<?> novaCategoria(@RequestBody NovaCategoriaRequest input, @AuthenticationPrincipal Usuario usuario) {
        service.novaCategoria(usuario, new Categoria(0L, input.descricao(), true));
        return new Response<>(HttpStatus.OK.value(), "Categoria criada com sucesso", null);
    }

    @PutMapping("/{id}")
    public Response<?> atualizarCategoria(@PathVariable("id") Long id, @RequestBody NovaCategoriaRequest input, @AuthenticationPrincipal Usuario usuario) {
        service.novaCategoria(usuario, new Categoria(id, input.descricao(), true));
        return new Response<>(HttpStatus.OK.value(), "Categoria atualizada com sucesso", null);
    }

    @GetMapping
    public Response<?> listaCategorias() {
        System.out.println(service.findAll());
        return new Response<>(HttpStatus.OK.value(), "Categoria listadas com sucesso", service.findAll());
    }

    @GetMapping("/{id}")
    public Response<?> buscaCategoria(@PathVariable("id") Long id, @AuthenticationPrincipal Usuario usuario) {
        return new Response<>(HttpStatus.OK.value(), "Categoria listadas com sucesso", service.findById(id));
    }

    @DeleteMapping("/{id}")
    public Response<?> inativarCategoria(@PathVariable("id") Long id, @AuthenticationPrincipal Usuario usuario) {
        Categoria cat = service.findById(id).orElseThrow(() -> new RecursoNaoEncontradoException("Categoria não encontrada"));
        service.inativarCategoria(usuario, cat);
        return new Response<>(HttpStatus.OK.value(), "Categoria inativada com sucesso", null);
    }

}
