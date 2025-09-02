package com.controlemanutencao.repository;

import com.controlemanutencao.model.Solicitacao;
import com.controlemanutencao.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {
}
