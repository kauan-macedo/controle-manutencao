package com.controlemanutencao.model;

import com.controlemanutencao.model.enums.Converter;
import com.controlemanutencao.model.enums.StatusSolicitacao;
import jakarta.persistence.*;

@Entity
@Table(name = "ME_LogSolicitacao")
public class LogSolicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdOrcamento", columnDefinition="INT")
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


    public LogSolicitacao(Solicitacao s, StatusSolicitacao statusAnterior, StatusSolicitacao novoStatus, Long data) {
        this.statusAnterior = statusAnterior;
        this.novoStatus = novoStatus;
        this.data = data;
        this. solicitacao = s;
    }
}
