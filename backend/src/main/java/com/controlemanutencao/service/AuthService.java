package com.controlemanutencao.service;

import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UsuarioRepository userRepository;

    public AuthService(UsuarioRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Optional<Usuario> findUserByLogin(String email, String password) {

        Usuario user = userRepository.findByEmailAndSenha(email, password).orElseGet(() -> null);
        return Optional.ofNullable(user);

    }

}
