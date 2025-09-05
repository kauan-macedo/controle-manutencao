package com.controlemanutencao.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ME_Login")
public class Login {

    @Id
    @ManyToOne
    @JoinColumn(name = "IdUsuario", referencedColumnName = "IdUsuario")
    private Usuario usuario;

    @Column(name = "Senha")
    private String senha;

    public Usuario getUsuario() {
        return usuario;
    }

    public String getSenha() {
        return senha;
    }
}
