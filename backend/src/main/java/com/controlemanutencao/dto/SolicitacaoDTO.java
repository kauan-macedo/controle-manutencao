package com.controlemanutencao.dto;

import com.controlemanutencao.model.LogSolicitacao;
import com.controlemanutencao.model.Solicitacao;
import com.controlemanutencao.utils.Utils;

import java.util.List;

public record SolicitacaoDTO (
        Long id,
        short status,
        String descricaoDefeito,
        String descricaoEquipamento,
        String dataCriacao,
        String dataArrumado,
        boolean ativo,
        OrcamentoDTO orcamento,
        UsuarioDTO usuario,
        UsuarioDTO responsavel,
        CategoriaDTO categoria,
        List<LogSolicitacaoDTO> historico
) {
    public static SolicitacaoDTO from(Solicitacao sol, List<LogSolicitacao> logs) {
        return sol == null ? null : new SolicitacaoDTO(
                sol.getId(),
                sol.getStatus().getId(),
                sol.getDescricaoDefeito(),
                sol.getDescricaoEquipamento(),
                Utils.parseMillis(sol.getDataCriacao()),
                Utils.parseMillis(sol.getDataArrumado()),
                sol.isAtivo(),
                OrcamentoDTO.from(sol.getOrcamento()),
                UsuarioDTO.from(sol.getUsuario()),
                UsuarioDTO.from(sol.getResponsavel()),
                CategoriaDTO.from(sol.getCategoria()),
                logs.stream().map(LogSolicitacaoDTO::from).toList()
        );
    }
}
