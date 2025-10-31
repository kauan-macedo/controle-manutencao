package com.controlemanutencao.dto;

import com.controlemanutencao.model.Orcamento;
import com.controlemanutencao.utils.Utils;

public record OrcamentoDTO(double valor, String descricao, String dataCriacao) {
    public static OrcamentoDTO from(Orcamento orc) {
        return orc == null ? null : new OrcamentoDTO(
                orc.getValor(),
                orc.getDescricao(),
                Utils.parseMillis(orc.getDataCriacao())
        );
    }
}
