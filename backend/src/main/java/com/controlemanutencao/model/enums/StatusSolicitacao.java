package com.controlemanutencao.model.enums;

public enum StatusSolicitacao {
    NOVA((short) 1),
    APROVADA((short) 2),
    REJEITADA((short) 3),
    ORCADA((short) 4),
    ARRUMADA((short) 5),
    FINALIZADA((short) 6);

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
