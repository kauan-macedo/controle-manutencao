package com.controlemanutencao.model;

import com.controlemanutencao.repository.Converter;
import com.controlemanutencao.model.enums.StatusSolicitacao;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ME_LogSolicitacao")
@NoArgsConstructor
public class LogSolicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdLogSolicitacao", columnDefinition="INT")
    @Getter private Long id;

    @ManyToOne
    @JoinColumn(name = "IdSolicitacao")
    @Getter @Setter private Solicitacao solicitacao;

    @ManyToOne
    @JoinColumn(name = "Agente")
    @Getter @Setter private Usuario agente;

    @Column(name = "StatusAnterior")
    @Convert(converter = Converter.StatusSolicitacaoConverter.class)
    @Getter @Setter private StatusSolicitacao statusAnterior;

    @Column(name = "NovoStatus")
    @Convert(converter = Converter.StatusSolicitacaoConverter.class)
    @Getter @Setter private StatusSolicitacao novoStatus;

    @Column(name = "Data")
    @Getter @Setter private Long data;

    public LogSolicitacao(Solicitacao s, StatusSolicitacao statusAnterior, StatusSolicitacao novoStatus, Long data) {
        this.statusAnterior = statusAnterior;
        this.novoStatus = novoStatus;
        this.data = data;
        this.solicitacao = s;
    }

}
