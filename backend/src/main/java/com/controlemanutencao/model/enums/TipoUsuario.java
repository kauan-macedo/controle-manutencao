package com.controlemanutencao.model.enums;

public enum TipoUsuario {
    CLIENTE(1), FUNCIONARIO(2);

    private int id;

    private TipoUsuario(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public static TipoUsuario fromId(int id) {
        if(id == 1) {
            return TipoUsuario.CLIENTE;
        }
        return TipoUsuario.FUNCIONARIO;
    }
}
