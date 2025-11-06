package com.controlemanutencao.model.enums;

public enum StatusSolicitacao {
    NOVA((short) 1),
    ORCADA((short) 3, NOVA),
    REJEITADA((short) 4, ORCADA),
    APROVADA((short) 5, REJEITADA),
    REDIRECIONADA((short) 2, APROVADA),
    ARRUMADA((short) 6, APROVADA),
    PAGA((short) 8, ARRUMADA),
    FINALIZADA((short) 7, PAGA);

    private short id;
    private StatusSolicitacao[] proximosPossiveis;

    StatusSolicitacao(short id, StatusSolicitacao ...proximosPossiveis) {
        this.id = id;
        this.proximosPossiveis = proximosPossiveis;
    }

    public short getId() {
        return id;
    }

    public StatusSolicitacao[] getProximosStatusPossiveis() {
        return proximosPossiveis;
    }

    public static StatusSolicitacao fromId(short id) {
        for (StatusSolicitacao s : values()) {
            if (s.getId() == id) return s;
        }
        throw new IllegalArgumentException("ID inválido de solicitacão: " + id);
    }
}
