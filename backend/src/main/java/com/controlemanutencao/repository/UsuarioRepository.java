package com.controlemanutencao.repository;

import com.controlemanutencao.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    @Query("SELECT u FROM Usuario u JOIN u.login l WHERE l.email = :email AND l.password = :password")
    Optional<Usuario> findByLogin(@Param("email") String email, @Param("password") String password);


}
