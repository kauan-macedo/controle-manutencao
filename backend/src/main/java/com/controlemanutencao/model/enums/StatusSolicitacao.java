package com.controlemanutencao.model.enums;

public enum StatusSolicitacao {
    NOVA((short) 1),
    APROVADA((short) 2),
    REJEITADA((short) 3),
    ORCADA((short) 4),
    REDIRECIONADA((short) 5),
    ARRUMADA((short) 6),
    FINALIZADA((short) 7);

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
