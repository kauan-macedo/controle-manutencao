package com.controlemanutencao.dto;

import com.controlemanutencao.model.Usuario;

public class UsuarioDTO {

    private int id;
    private String nome;
    private String cpf;
    private String tipoUsuario;
    private String email;
    private String telefone;
    private EnderecoDTO endereco;

    public static UsuarioDTO from(Usuario user) {

        EnderecoDTO enderecoDTO = new EnderecoDTO(
                user.getRua(),
                user.getCEP(),
                user.getBairro(),
                user.getCidade(),
                user.getEstado(),
                user.getNumero()
        );

        return new UsuarioDTO(user.getId(), user.getNome(), user.getCPF(), user.getTipoUsuario().name(), user.getEmail(), user.getTelefone(), enderecoDTO);

    }

    public UsuarioDTO(int id, String nome, String cpf, String tipoUsuario, String email, String telefone, EnderecoDTO endereco) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.tipoUsuario = tipoUsuario;
        this.email = email;
        this.telefone = telefone;
        this.endereco = endereco;
    }

    public int getId() {
        return id;
    }

    public String getNome() {
        return nome;
    }

    public String getCpf() {
        return cpf;
    }

    public String getTipoUsuario() {
        return tipoUsuario;
    }

    public String getEmail() {
        return email;
    }

    public String getTelefone() {
        return telefone;
    }

    public EnderecoDTO getEndereco() {
        return endereco;
    }
}
