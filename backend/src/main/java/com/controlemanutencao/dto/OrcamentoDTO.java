package com.controlemanutencao.dto;

import com.controlemanutencao.model.Orcamento;
import com.controlemanutencao.utils.Utils;

import java.time.format.DateTimeFormatter;

public record OrcamentoDTO(double valor, String descricao, String dataCriacao) {
    public static OrcamentoDTO from(Orcamento orc) {
        if (orc != null) {
            return new OrcamentoDTO(
                    orc.getValor(),
                    orc.getDescricao(),
                    Utils.parseMillis(orc.getDataCriacao(), DateTimeFormatter.ISO_LOCAL_DATE_TIME)
            );
        }
        return null;
    }
}
