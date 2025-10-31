package com.controlemanutencao.model;

import com.controlemanutencao.repository.Converter;
import jakarta.persistence.*;

@Entity
@Table(name = "ME_Categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdCategoria", columnDefinition="INT")
    private Long id;

    @Column(name = "DescCategoria")
    private String descricao;

    @Column(name = "Ativo")
    @Convert(converter = Converter.BooleanToIntegerConverter.class)
    private boolean ativo;

    public Categoria() {
    }

    public Categoria(Long id, String descricao, boolean ativo) {
        this.id = id;
        this.descricao = descricao;
        this.ativo = ativo;
    }

    public Long getId() {
        return id;
    }

    public String getDescricao() {
        return descricao;
    }

    public boolean isAtivo() {
        return ativo;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }
}
