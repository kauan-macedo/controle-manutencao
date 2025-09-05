package com.controlemanutencao.service;

import com.controlemanutencao.model.Login;
import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.repository.LoginRepository;
import com.controlemanutencao.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final LoginRepository repository;
    private final UsuarioRepository userRepository;

    public AuthService(LoginRepository repository, UsuarioRepository userRepository) {
        this.repository = repository;
        this.userRepository = userRepository;
    }

    public Optional<Usuario> findUserByLogin(String email, String password) {

        Login user = repository.findLoginByEmail(email).orElseGet(() -> null);

        if(user == null) {
            return Optional.empty();
        }

        if(user.getSenha().equals(password)) {
            return Optional.of(user.getUsuario());
        }

        return Optional.empty();

    }

}
