package com.controlemanutencao.model;

import com.controlemanutencao.repository.Converter;
import com.controlemanutencao.model.enums.StatusSolicitacao;
import jakarta.persistence.*;

@Entity
@Table(name = "ME_LogSolicitacao")
public class LogSolicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdLogSolicitacao", columnDefinition="INT")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "IdSolicitacao")
    private Solicitacao solicitacao;

    @ManyToOne
    @JoinColumn(name = "Agente")
    private Usuario agente;

    @Column(name = "Descricao")
    private String descricao;

    @Column(name = "Data")
    private Long data;


    public LogSolicitacao() {
    }

    public LogSolicitacao(Solicitacao s, Usuario agente, String descricao, Long data) {
        this.agente = agente;
        this.descricao = descricao;
        this.data = data;
        this.solicitacao = s;
    }

    public Long getId() {
        return id;
    }

    public Solicitacao getSolicitacao() {
        return solicitacao;
    }

    public Usuario getAgente() {
        return agente;
    }

    public String getDescricao() {
        return descricao;
    }

    public Long getData() {
        return data;
    }
}