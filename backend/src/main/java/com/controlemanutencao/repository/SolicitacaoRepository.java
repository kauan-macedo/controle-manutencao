package com.controlemanutencao.repository;

import com.controlemanutencao.dto.RelatorioReceitaCategoriaDTO;
import com.controlemanutencao.dto.RelatorioReceitaDTO;
import com.controlemanutencao.model.Solicitacao;
import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.model.enums.StatusSolicitacao;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

    @Query("""
       SELECT s FROM Solicitacao s
       WHERE (:dataInicioParam IS NULL OR s.dataCriacao >= :dataInicioParam)
         AND (:dataFimParam IS NULL OR s.dataCriacao <= :dataFimParam)
         AND (
              :statusParam IS NULL
              OR COALESCE(:statusParam, NULL) IS NULL
              OR s.status IN :statusParam
         )
         AND (
              :filtroPorClienteParam = FALSE
              OR :filtroPorClienteParam IS NULL
              OR s.usuario.id = :idUsuarioLogadoParam
         )
         ORDER BY s.dataCriacao ASC
       """)
    Page<Solicitacao> buscaSolicitacoes(
            @Param("dataInicioParam") Long dataInicio,
            @Param("dataFimParam") Long dataFim,
            @Param("filtroPorClienteParam") Boolean filtroPorCliente,
            @Param("idUsuarioLogadoParam") Long idUsuarioLogado,
            @Param("statusParam") List<StatusSolicitacao> status,
            Pageable pageable
    );

    @Query("SELECT s FROM Solicitacao s WHERE " +
            // Novo parâmetro booleano para a verificação de funcionário
            "((:isFuncionarioP = TRUE) OR (s.usuario = :usuarioParam)) AND " +
            "(s.id = :idSolicitacao)")
    Optional<Solicitacao> findByIdWithUser(
            @Param("usuarioParam") Usuario usuarioParam,
            @Param("idSolicitacao") Long idSolicitacao,
            @Param("isFuncionarioP") boolean isFuncionarioP
    );

    @Query("""
    SELECT new com.controlemanutencao.dto.RelatorioReceitaCategoriaDTO(
            s.categoria.descricao,
            SUM(s.orcamento.valor)
        )
        FROM Solicitacao s
        WHERE s.orcamento IS NOT NULL
          AND s.categoria IS NOT NULL
          AND (s.status = 7 OR s.status = 8)
        GROUP BY s.categoria
    """)
    List<RelatorioReceitaCategoriaDTO> listarReceitasPorCategoria();

    @Query("""
        SELECT new com.controlemanutencao.dto.RelatorioReceitaDTO(
            CONCAT('', FUNCTION('DATE', FUNCTION('FROM_UNIXTIME', s.dataCriacao / 1000))),
            SUM(s.orcamento.valor)
        )
        FROM Solicitacao s
        WHERE s.dataCriacao IS NOT NULL
          AND s.orcamento IS NOT NULL
          AND (s.status = 7 OR s.status = 8)
          AND (:dataInicioParam IS NULL OR s.dataCriacao >= :dataInicioParam)
          AND (:dataFimParam IS NULL OR s.dataCriacao <= :dataFimParam)
        GROUP BY CONCAT('', FUNCTION('DATE', FUNCTION('FROM_UNIXTIME', s.dataCriacao / 1000)))
        ORDER BY CONCAT('', FUNCTION('DATE', FUNCTION('FROM_UNIXTIME', s.dataCriacao / 1000)))
    """)
        List<RelatorioReceitaDTO> receitasPorData(
                @Param("dataInicioParam") Long dataInicio,
                @Param("dataFimParam") Long dataFim
        );


}
