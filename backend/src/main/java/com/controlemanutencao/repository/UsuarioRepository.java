package com.controlemanutencao.repository;

import com.controlemanutencao.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    @Query(
            value = "SELECT u.* " +
                    "FROM ME_Usuario u " +
                    "JOIN ME_Login l ON l.IdUsuario = u.IdUsuario " +
                    "WHERE l.email = :email AND l.password = :password",
            nativeQuery = true
    )
    Optional<Usuario> findByLogin(@Param("email") String email, @Param("password") String password);


}
