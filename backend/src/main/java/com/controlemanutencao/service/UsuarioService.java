package com.controlemanutencao.service;

import com.controlemanutencao.exception.DeveSerFuncionarioException;
import com.controlemanutencao.exception.EmailAlreadyTakenException;
import com.controlemanutencao.model.EnderecoViaCep;
import com.controlemanutencao.model.Usuario;
import com.controlemanutencao.model.enums.TipoUsuario;
import com.controlemanutencao.model.request.AtualizarFuncionarioRequest;
import com.controlemanutencao.model.request.AutoCadastroRequest;
import com.controlemanutencao.model.request.CriarFuncionarioRequest;
import com.controlemanutencao.repository.UsuarioRepository;
import jakarta.mail.AuthenticationFailedException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class UsuarioService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    private final UsuarioRepository repository;

    private final MailService mailService;
    private final ViaCEPService viaCEPService;

    public UsuarioService(UsuarioRepository repository, MailService mailService, ViaCEPService viaCEPService) {
        this.mailService = mailService;
        this.repository = repository;
        this.viaCEPService = viaCEPService;
    }

    public Optional<Usuario> findById(Long id) {
        return repository.findById(id);
    }

    public Optional<Usuario> findByLogin(String email, String password) {
        Optional<Usuario> opt = repository.findFirstByEmailAndAtivoTrue(email);
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
        return repository.findByAtivo(true);
    }

    public List<Usuario> findFuncionarios() { return repository.findByTipoUsuarioAndAtivoTrue(TipoUsuario.FUNCIONARIO); }

    public Usuario buscarUsuario(Usuario sender, Long userId) {
        if(!sender.isFuncionario()) {
            throw new DeveSerFuncionarioException();
        }
        Optional<Usuario> usr = repository.findById(userId);
        if(usr.isEmpty()) {
            throw new IllegalArgumentException("Usuário não encontrado.");
        }
        return usr.get();
    }

    public void inativarUsuario(Usuario sender, Long userId) {
        if(!sender.isFuncionario()) {
            throw new DeveSerFuncionarioException();
        }
        if(sender.getId() == userId) {
            throw new IllegalArgumentException("Não é permitido inativar seu próprio perfil.");
        }
        Optional<Usuario> opt = repository.findById(userId);
        if(opt.isEmpty()) {
            throw new IllegalArgumentException("Usuário não encontrado!");
        }
        opt.get().setAtivo(false);
        repository.save(opt.get());
    }

    @Transactional
    public void atualizarFunctionario(Usuario sender, Long id, AtualizarFuncionarioRequest in) {
        if(!sender.isFuncionario()) {
            throw new DeveSerFuncionarioException();
        }
        Optional<Usuario> opt = repository.findById(id);
        if(opt.isEmpty()) {
            throw new IllegalArgumentException("Usuário não encontrado!");
        }
        Usuario usr = opt.get();
        usr.setNome(in.nome());
        usr.setEmail(in.email());
        repository.save(usr);
    }

    @Transactional
    public void criarFuncionario(Usuario sender, CriarFuncionarioRequest in) throws RuntimeException {
        if(!sender.isFuncionario()) {
            throw new DeveSerFuncionarioException();
        }
        if(repository.existsByEmail(in.email())) {
            throw new EmailAlreadyTakenException();
        }
        Usuario usuario = new Usuario(
                0,
                in.nome(),
                in.email(),
                null,
                null,
                null,
                null,
                null,
                null,
                0,
                null,
                TipoUsuario.FUNCIONARIO,
                true,
                in.dtNascimento()
        );
        LocalDate dataNascimento = LocalDate.parse(in.dtNascimento());
        LocalDate hoje = LocalDate.now();
        LocalDate dataMaioridade = dataNascimento.plusYears(18);
        if(hoje.isBefore(dataMaioridade)) {
           throw new IllegalArgumentException("Funcionário deve ser maior de 18 anos!");
        }
        usuario.setSenha(in.senha());
        repository.save(usuario);
        String mensagem = "Seja bem vindo ao ambiente Controle Manutenção!"
                + "\nPara fazer login como funcionário, utilize seu email e a seguinte senha: " + in.senha();
        try {
            mailService.sendEmail(usuario.getEmail(), "Controle Manutenção: Boas vindas!", mensagem);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao enviar email", e);
        }

    }

    @Transactional
    public Usuario autocadastro(AutoCadastroRequest in) throws RuntimeException {

        if(repository.existsByEmail(in.email())) {
            throw new EmailAlreadyTakenException();
        }

        if(repository.existsByCPF(in.cpf())) {
            throw new IllegalArgumentException("CPF já em uso!");
        }

        if(repository.existsByTelefone(in.telefone())) {
            throw new IllegalArgumentException("Telefone já em uso!");
        }

        EnderecoViaCep enderecoViaCep = viaCEPService.buscarCEP(in.cep().replace("-", ""));

        Usuario usuario = new Usuario(
                0,
                in.nome(),
                in.email(),
                in.telefone(),
                in.cpf(),
                enderecoViaCep.localidade(),
                enderecoViaCep.estado(),
                enderecoViaCep.logradouro(),
                enderecoViaCep.bairro(),
                in.numero(),
                in.cep().replace("-", ""),
                TipoUsuario.CLIENTE,
                true,
                ""
        );

        int senha = ThreadLocalRandom.current().nextInt(1000, 10000);
        usuario.setSenha(passwordEncoder.encode(senha + ""));

        repository.save(usuario);

        String mensagem = "Seja bem vindo ao ambiente Controle Manutenção!"
                + "\nPara fazer login, utilize seu email e a seguinte senha: " + senha;

        try {
            mailService.sendEmail(usuario.getEmail(), "Controle Manutenção: Boas vindas!", mensagem);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao enviar email", e);
        }

        return usuario;

    }

}
