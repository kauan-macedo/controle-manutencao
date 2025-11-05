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

    @Column(name = "StatusAnterior")
    @Convert(converter = Converter.StatusSolicitacaoConverter.class)
    private StatusSolicitacao statusAnterior;

    @Column(name = "NovoStatus")
    @Convert(converter = Converter.StatusSolicitacaoConverter.class)
    private StatusSolicitacao novoStatus;

    @Column(name = "Data")
    private Long data;


    public LogSolicitacao() {
    }

    public LogSolicitacao(Solicitacao s, StatusSolicitacao statusAnterior, StatusSolicitacao novoStatus, Long data) {
        this.statusAnterior = statusAnterior;
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
