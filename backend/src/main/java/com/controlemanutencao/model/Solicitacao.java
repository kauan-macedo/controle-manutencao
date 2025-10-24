package com.controlemanutencao.model;

import com.controlemanutencao.repository.Converter;
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
    @Convert(converter = Converter.StatusSolicitacaoConverter.class)
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

    @ManyToOne
    @JoinColumn(name = "IdUsuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "IdResponsavel")
    private Usuario responsavel;

    @ManyToOne
    @JoinColumn(name = "IdCategoria")
    private Categoria categoria;

    public Solicitacao() {
    }

    public Solicitacao(Long id, StatusSolicitacao status, String descricaoDefeito, String descricaoEquipamento, Long dataCriacao, Long dataArrumado, Orcamento orcamento, Usuario usuario, Categoria categoria) {
        this.id = id;
        this.status = status;
        this.descricaoDefeito = descricaoDefeito;
        this.descricaoEquipamento = descricaoEquipamento;
        this.dataCriacao = dataCriacao;
        this.dataArrumado = dataArrumado;
        this.orcamento = orcamento;
        this.usuario = usuario;
        this.categoria = categoria;
    }

    public Long getId() {
        return id;
    }

    public StatusSolicitacao getStatus() {
        return status;
    }

    public void setOrcamento(Orcamento orcamento) {
        this.orcamento = orcamento;
    }

    public String getDescricaoDefeito() {
        return descricaoDefeito;
    }

    public void setStatus(StatusSolicitacao status) {
        this.status = status;
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

    public void setDescricaoDefeito(String descricaoDefeito) {
        this.descricaoDefeito = descricaoDefeito;
    }

    public void setDescricaoEquipamento(String descricaoEquipamento) {
        this.descricaoEquipamento = descricaoEquipamento;
    }

    public void setDataCriacao(Long dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public void setDataArrumado(Long dataArrumado) {
        this.dataArrumado = dataArrumado;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public void setResponsavel(Usuario responsavel) {
        this.responsavel = responsavel;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }
}
