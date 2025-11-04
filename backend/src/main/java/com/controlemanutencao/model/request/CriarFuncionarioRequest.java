package com.controlemanutencao.model.request;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CriarFuncionarioRequest (String email, String nome, @JsonProperty("dt_nascimento") String dtNascimento, String senha) { }
