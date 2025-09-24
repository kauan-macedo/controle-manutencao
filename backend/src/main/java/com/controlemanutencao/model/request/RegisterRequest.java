package com.controlemanutencao.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequest(
    @NotBlank @NotNull String email,
    @NotBlank @NotNull String nome,
    @NotBlank @NotNull String cpf,
    @NotBlank @NotNull String telefone,
    @NotBlank @NotNull String cep,
    @NotBlank @NotNull Integer numero
) { }
