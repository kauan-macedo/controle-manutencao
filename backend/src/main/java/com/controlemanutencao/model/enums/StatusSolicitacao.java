package com.controlemanutencao.model.enums;

public enum StatusSolicitacao {
    FINALIZADA((short) 7, "FINALIZADA"),
    PAGA((short) 8, "PAGA", FINALIZADA),
    ARRUMADA((short) 6, "ARRUMADA", PAGA),
    REDIRECIONADA((short) 2, "REDIRECIONADA", ARRUMADA),
    APROVADA((short) 5, "APROVADA", REDIRECIONADA, ARRUMADA),
    REJEITADA((short) 4, "REJEITADA", APROVADA),
    ORCADA((short) 3, "ORÇADA", REJEITADA, APROVADA),
    NOVA((short) 1, "NOVA", ORCADA);

    private short id;
    private StatusSolicitacao[] proximosPossiveis;
    private String desc;

    StatusSolicitacao(short id, String desc, StatusSolicitacao ...proximosPossiveis) {
        this.id = id;
        this.desc = desc;
        this.proximosPossiveis = proximosPossiveis;
    }

    public short getId() {
        return id;
    }

    public String getDesc() {
        return desc;
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
