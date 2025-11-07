package com.controlemanutencao.dto;

import com.controlemanutencao.model.LogSolicitacao;
import com.controlemanutencao.utils.Utils;

import java.time.format.DateTimeFormatter;

public record LogSolicitacaoDTO(
    UsuarioDTO agente,
    String descricao,
    String data
) {
    public static LogSolicitacaoDTO from(LogSolicitacao log) {
        return log == null ? null : new LogSolicitacaoDTO(
                UsuarioDTO.from(log.getAgente()),
                log.getDescricao(),
                Utils.parseMillis(log.getData(), DateTimeFormatter.ISO_LOCAL_DATE_TIME)
        );
    }
}
