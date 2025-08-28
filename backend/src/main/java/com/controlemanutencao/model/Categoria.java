package com.controlemanutencao.model;

import jakarta.persistence.*;

@Entity
@Table(name = "ME_Categorias")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IdCategoria", columnDefinition="INT")
    private Long id;

    @Column(name = "DescCategoria")
    private String descricao;

}
