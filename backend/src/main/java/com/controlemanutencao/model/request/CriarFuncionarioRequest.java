package com.controlemanutencao.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CriarFuncionarioRequest (String email, String nome, @JsonProperty("data_nascimento") String dtNascimento, String senha) { }
