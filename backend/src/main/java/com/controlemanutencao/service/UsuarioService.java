package com.controlemanutencao.service;

import com.controlemanutencao.exception.EmailAlreadyTakenException;
import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.repository.UsuarioRepository;
import jakarta.mail.AuthenticationFailedException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class UsuarioService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    private final UsuarioRepository repository;

    private final MailService mailService;

    public UsuarioService(UsuarioRepository repository, MailService mailService) {
        this.mailService = mailService;
        this.repository = repository;
    }

    public Optional<Usuario> findById(Long id) {
        return repository.findById(id);
    }

    public Optional<Usuario> findByLogin(String email, String password) {
        Optional<Usuario> opt = repository.findByEmail(email);
        if(opt.isEmpty()) {
            return opt;
        }
        if(passwordEncoder.matches(password, opt.get().getPassword())) {
            return opt;
        } else {
            return Optional.empty();
        }
    }

    public List<Usuario> findAll() {
        return repository.findAll();
    }

    @Transactional
    public void criarUsuario(Usuario user) throws RuntimeException {

        if(repository.existsByEmail(user.getEmail())) {
            throw new EmailAlreadyTakenException();
        }

        int senha = ThreadLocalRandom.current().nextInt(1000, 10000);
        user.setSenha(passwordEncoder.encode(senha + ""));

        repository.save(user);

        String mensagem = "Seja bem vindo ao ambiente Controle Manutenção!"
                + "\nPara fazer login, utilize seu email e a seguinte senha: " + senha;

        try {
            mailService.sendEmail(user.getEmail(), "Controle Manutenção: Boas vindas!", mensagem);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao enviar email", e);
        }

    }

}
