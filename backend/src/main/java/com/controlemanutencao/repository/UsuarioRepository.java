package com.controlemanutencao.repository;

import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.model.enums.TipoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    boolean existsByEmail(String email);
    boolean existsByCPF(String cpf);
    boolean existsByTelefone(String cpf);
    Optional<Usuario> findFirstByEmailAndAtivoTrue(String email);
    List<Usuario> findByTipoUsuarioAndAtivoTrue(TipoUsuario tipoUsuario);
    List<Usuario> findByAtivo(boolean bool);

}
