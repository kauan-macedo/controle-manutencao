package com.controlemanutencao.model.request;

public record RegisterRequest(
    String email,
    String nome,
    String cpf,
    String telefone,
    String rua,
    String cep,
    int numero,
    String bairro,
    String cidade,
    String estado
) { }
