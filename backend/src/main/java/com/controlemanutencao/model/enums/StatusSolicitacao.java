package com.controlemanutencao.model.enums;

public enum StatusSolicitacao {
    NOVA((short) 1),
    ORCAMENTO_ENVIADO((short) 2),
    ORCAMENTO_APROVADO((short) 3),
    FINALIZADO((short) 4);

    private short id;

    StatusSolicitacao(short id) {
        this.id = id;
    }

    public short getId() {
        return id;
    }

    public static StatusSolicitacao fromId(short id) {
        for (StatusSolicitacao s : values()) {
            if (s.getId() == id) return s;
        }
        throw new IllegalArgumentException("ID inválido de solicitacão: " + id);
    }
}
