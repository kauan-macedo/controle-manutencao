package com.controlemanutencao.repository;

import com.controlemanutencao.model.Solicitacao;
import com.controlemanutencao.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SolicitacaoRepository extends JpaRepository<Solicitacao, Long> {

    List<Solicitacao> findByUsuario(Usuario usuario);

}
