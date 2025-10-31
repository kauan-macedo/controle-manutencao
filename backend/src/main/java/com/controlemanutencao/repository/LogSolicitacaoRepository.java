package com.controlemanutencao.repository;

import com.controlemanutencao.model.LogSolicitacao;
import com.controlemanutencao.model.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LogSolicitacaoRepository extends JpaRepository<LogSolicitacao, Long>  {

    List<LogSolicitacao> findBySolicitacao(Solicitacao s);

}
