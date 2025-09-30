package com.controlemanutencao.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ME_Orcamento")
public class Orcamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdOrcamento", columnDefinition="INT")
    private Long id;

    @Column(name = "Valor")
    private double valor;

    @Column(name = "Descricao")
    private String descricao;

    @Column(name = "DthCriacao")
    private Long dataCriacao;

    public Orcamento() {
    }

    public Orcamento(Long id, double valor, String descricao, Long dataCriacao) {
        this.id = id;
        this.valor = valor;
        this.descricao = descricao;
        this.dataCriacao = dataCriacao;
    }

    public Long getId() {
        return id;
    }

    public double getValor() {
        return valor;
    }

    public Long getDataCriacao() {
        return dataCriacao;
    }

}