package com.controlemanutencao.model.enums;

public enum StatusSolicitacao {
    FINALIZADA((short) 7),
    PAGA((short) 8, FINALIZADA),
    ARRUMADA((short) 6, PAGA),
    REDIRECIONADA((short) 2, ARRUMADA),
    APROVADA((short) 5, REDIRECIONADA, ARRUMADA),
    REJEITADA((short) 4, APROVADA),
    ORCADA((short) 3, REJEITADA, APROVADA),
    NOVA((short) 1, ORCADA);

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
