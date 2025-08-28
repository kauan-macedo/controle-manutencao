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

}
