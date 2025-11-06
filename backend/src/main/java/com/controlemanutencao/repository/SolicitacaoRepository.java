package com.controlemanutencao.repository;

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

    @Query("SELECT s FROM Solicitacao s WHERE " +
            "(:dataInicioParam IS NULL OR s.dataCriacao >= :dataInicioParam) AND " +
            "(:dataFimParam IS NULL OR s.dataCriacao <= :dataFimParam) AND " +
            "(:statusParam IS NULL OR s.status = :statusParam) AND " +
            "(:filtroPorClienteParam = FALSE OR :filtroPorClienteParam IS NULL OR s.usuario.id = :idUsuarioLogadoParam)")
    Page<Solicitacao> buscaSolicitacoes( // Retorna um Page
                                                    @Param("dataInicioParam") Long dataInicio,
                                                    @Param("dataFimParam") Long dataFim,
                                                    @Param("filtroPorClienteParam") Boolean filtroPorCliente,
                                                    @Param("idUsuarioLogadoParam") Long idUsuarioLogado,
                                                    @Param("statusParam") StatusSolicitacao status,
                                                    Pageable pageable);

    @Query("SELECT s FROM Solicitacao s WHERE " +
            // Novo parâmetro booleano para a verificação de funcionário
            "((:isFuncionarioP = TRUE) OR (s.usuario = :usuarioParam)) AND " +
            "(s.id = :idSolicitacao)")
    Optional<Solicitacao> findByIdWithUser(
            @Param("usuarioParam") Usuario usuarioParam,
            @Param("idSolicitacao") Long idSolicitacao,
            @Param("isFuncionarioP") boolean isFuncionarioP // NOVO PARÂMETRO
    );

}
