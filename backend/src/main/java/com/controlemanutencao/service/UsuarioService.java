package com.controlemanutencao.service;

import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class UsuarioService {

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
        return repository.findByLogin(email, password);
    }

    public List<Usuario> findAll() {
        return repository.findAll();
    }

    @Transactional
    public void criarUsuario(Usuario user) throws Exception {

        repository.save(user);

        int senha = ThreadLocalRandom.current().nextInt(1000, 10000);

        String mensagem = "Seja bem vindo ao ambiente Controle Manutenção!"
                + "\nPara fazer login, utilize seu email e a seguinte senha: " + senha;

        mailService.sendEmail(user.getEmail(), "Controle Manutenção: Boas vindas!", mensagem);

    }

}
