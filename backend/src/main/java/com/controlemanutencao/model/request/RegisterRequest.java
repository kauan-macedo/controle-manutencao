package com.controlemanutencao.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegisterRequest(
    @NotBlank @NotNull String email,
    @NotBlank @NotNull String nome,
    @NotBlank @NotNull String cpf,
    @NotBlank @NotNull String telefone,
    @NotBlank @NotNull String rua,
    @NotBlank @NotNull String cep,
    @NotBlank @NotNull Integer numero,
    @NotBlank @NotNull String bairro,
    @NotBlank @NotNull String cidade,
    @NotBlank @NotNull String estado
) { }
