package com.controlemanutencao.repository;

import com.controlemanutencao.model.LogSolicitacao;
import com.controlemanutencao.model.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LogSolicitacaoRepository extends JpaRepository<LogSolicitacao, Long>  {



}
