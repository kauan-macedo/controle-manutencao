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

    @OneToOne
    @JoinColumn(name = "IdSolicitacao")
    private Solicitacao solicitacao;

    @OneToOne
    @JoinColumn(name = "Agente")
    private Usuario agente;

    @Column(name = "StatusAnterior")
    @Convert(converter = Converter.StatusSolicitacaoConverter.class)
    private StatusSolicitacao statusAnterior;

    @Column(name = "NovoStatus")
    @Convert(converter = Converter.StatusSolicitacaoConverter.class)
    private StatusSolicitacao novoStatus;

    @Column(name = "Data")
    private Long data;


    public LogSolicitacao(Long id, Solicitacao s, StatusSolicitacao statusAnterior, Usuario agente, StatusSolicitacao novoStatus, Long data) {
        this.statusAnterior = statusAnterior;
        this.id = id;
        this.agente = agente;
        this.novoStatus = novoStatus;
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

    public StatusSolicitacao getStatusAnterior() {
        return statusAnterior;
    }

    public StatusSolicitacao getNovoStatus() {
        return novoStatus;
    }

    public Long getData() {
        return data;
    }
}
