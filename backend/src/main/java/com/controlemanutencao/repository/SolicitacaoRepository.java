package com.controlemanutencao.repository;

import com.controlemanutencao.model.Solicitacao;
import com.controlemanutencao.model.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.awt.print.Pageable;
import java.util.List;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

    @Query("SELECT s FROM Solicitacao s WHERE " +
            "(:dataInicioParam IS NULL OR s.dataCriacao >= :dataInicioParam) AND " +
            "(:dataFimParam IS NULL OR s.dataCriacao <= :dataFimParam) AND " +
            "(:filtroPorClienteParam = FALSE OR :filtroPorClienteParam IS NULL OR s.usuario.id = :idUsuarioLogadoParam)")
    Page<Solicitacao> buscaSolicitacoes( // Retorna um Page
                                                    @Param("dataInicioParam") Long dataInicio,
                                                    @Param("dataFimParam") Long dataFim,
                                                    @Param("filtroPorClienteParam") Boolean filtroPorCliente,
                                                    @Param("idUsuarioLogadoParam") Long idUsuarioLogado,
                                                    Pageable pageable);

}
