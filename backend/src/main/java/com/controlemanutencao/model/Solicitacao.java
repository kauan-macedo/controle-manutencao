package com.controlemanutencao.model;

import com.controlemanutencao.model.enums.StatusSolicitacao;
import jakarta.persistence.*;

@Entity
@Table(name = "ME_Solicitacao")
public class Solicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdSolicitacao", columnDefinition="INT")
    private Long id;

    @Column(name = "Status")
    @Convert(converter = StatusSolicitacao.class)
    private StatusSolicitacao status;

    @Column(name = "DescDefeito")
    private String descricaoDefeito;

    @Column(name = "DescEquipamento")
    private String descricaoEquipamento;

    @Column(name = "DthCriacao")
    private Long dataCriacao;

    @Column(name = "DthArrumado")
    private Long dataArrumado;

    @OneToOne
    @JoinColumn(name = "IdOrcamento")
    private Orcamento orcamento;

    @OneToMany
    @JoinColumn(name = "IdUsuario")
    private Usuario usuario;

    @OneToMany
    @JoinColumn(name = "IdCategoria")
    private Categoria categoria;

    public Long getId() {
        return id;
    }

    public StatusSolicitacao getStatus() {
        return status;
    }

    public String getDescricaoDefeito() {
        return descricaoDefeito;
    }

    public String getDescricaoEquipamento() {
        return descricaoEquipamento;
    }

    public Long getDataCriacao() {
        return dataCriacao;
    }

    public Long getDataArrumado() {
        return dataArrumado;
    }

    public Orcamento getOrcamento() {
        return orcamento;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public Categoria getCategoria() {
        return categoria;
    }
}
