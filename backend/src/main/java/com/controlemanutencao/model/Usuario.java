package com.controlemanutencao.model;

import com.controlemanutencao.repository.Converter;
import com.controlemanutencao.model.enums.TipoUsuario;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "ME_Usuario")
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdUsuario", columnDefinition="INT")
    private int id;

    @Column(name = "Nome")
    private String nome;

    @Column(name = "TipoUsuario")
    @Convert(converter = Converter.TipoUsuarioConverter.class)
    private TipoUsuario tipoUsuario;

    @Column(name = "Email", unique = true)
    private String email;

    @Column(name = "Telefone", unique = true)
    private String telefone;

    @Column(unique = true)
    private String CPF;

    @Column(name = "Cidade")
    private String cidade;

    @Column(name = "Estado")
    private String estado;

    @Column(name = "Rua")
    private String rua;

    @Column(name = "Bairro")
    private String bairro;

    @Column(name = "Ativo")
    private boolean ativo;

    @Column(name = "Numero")
    private int numero;

    @JsonIgnore
    @Column(name = "Senha")
    private String senha;

    @Column(name = "DtNascimento")
    private String dtNascimento;

    public Usuario() {}

    public Usuario(int id, String nome, String email, String telefone, String CPF, String cidade, String estado, String rua, String bairro, int numero, String CEP, TipoUsuario tipoUsuario, boolean ativo, String dtNascimento) {
        this.id = id;
        this.dtNascimento = dtNascimento;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.CPF = CPF;
        this.cidade = cidade;
        this.estado = estado;
        this.rua = rua;
        this.bairro = bairro;
        this.numero = numero;
        this.CEP = CEP;
        this.tipoUsuario = tipoUsuario;
        this.ativo = ativo;
    }

    private String CEP;

    public String getSenha() {
        return senha;
    }

    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getEmail() {
        return email;
    }

    public String getTelefone() {
        return telefone;
    }

    public String getCPF() {
        return CPF;
    }

    public String getCidade() {
        return cidade;
    }

    public String getEstado() {
        return estado;
    }

    public String getRua() {
        return rua;
    }

    public String getBairro() {
        return bairro;
    }

    public int getNumero() {
        return numero;
    }

    public String getCEP() {
        return CEP;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public void setCPF(String CPF) {
        this.CPF = CPF;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public void setNumero(int numero) {
        this.numero = numero;
    }

    public void setCEP(String CEP) {
        this.CEP = CEP;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public boolean isFuncionario() {
        return tipoUsuario == TipoUsuario.FUNCIONARIO;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return id + "";
    }

    public void setAtivo(boolean ativo) {
        this.ativo = ativo;
    }
}
