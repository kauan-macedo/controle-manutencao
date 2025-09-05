package com.controlemanutencao.repository;

import com.controlemanutencao.model.Login;
import com.controlemanutencao.model.Solicitacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface LoginRepository extends JpaRepository<Login, Long> {

    @Query("SELECT l FROM Login l WHERE l.usuario.email = :email")
    Optional<Login> findLoginByEmail(String email);

}
