package com.controlemanutencao.dto;

public class EnderecoDTO {

    private String logradouro;
    private String cep;
    private String bairro;
    private String cidade;
    private String estado;
    private int numero;

    public EnderecoDTO(String logradouro, String cep, String bairro, String cidade, String estado, int numero) {
        this.logradouro = logradouro;
        this.cep = cep;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.numero = numero;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public String getCep() {
        return cep;
    }

    public String getBairro() {
        return bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public String getEstado() {
        return estado;
    }

    public int getNumero() {
        return numero;
    }
}
