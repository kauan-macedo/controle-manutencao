package com.controlemanutencao.repository;

import com.controlemanutencao.model.Categoria;
import com.controlemanutencao.model.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
}
