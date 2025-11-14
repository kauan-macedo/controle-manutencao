package com.controlemanutencao.controller.advice;

import com.controlemanutencao.exception.*;
import com.controlemanutencao.http.response.Responses;
import com.controlemanutencao.model.Response;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Response<?> handleValidationErrors(MethodArgumentNotValidException ex) {
        return Responses.PREENCHA_TODOS_OS_CAMPOS;

    }

    @ExceptionHandler(CEPInvalidoException.class)
    public Response<?> handleCEPInvalidoException(CEPInvalidoException ex) {
        return Responses.CEP_INVALIDO;

    }

    @ExceptionHandler(EmailAlreadyTakenException.class)
    public Response<?> handleEmailAlreadyTakenException(EmailAlreadyTakenException ex) {
        return Responses.EMAIL_EM_USO;
    }

    @ExceptionHandler(DeveSerFuncionarioException.class)
    public Response<?> handleDeveSerFuncionarioException(DeveSerFuncionarioException ex) {
        return Responses.DEVE_SER_FUNCIONARIO;
    }


    @ExceptionHandler(EstadoIlegalSolicitacaoException.class)
    public Response<?> handleEstadoIlegalSolicitacaoException(EstadoIlegalSolicitacaoException ex) {
        return new Response<>(HttpStatus.FORBIDDEN.value(), ex.getMessage(), null);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public Response<?> handleIllegalArgumentException(IllegalArgumentException ex) {
        return new Response<>(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), null);
    }

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public Response<?> handleRecursoNaoEncontradoException(RecursoNaoEncontradoException ex) {
        return new Response<>(HttpStatus.NOT_FOUND.value(), ex.getMessage(), null);
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public Response<?> handleExpiredJwtException(ExpiredJwtException ex) {
        return new Response<>(HttpStatus.UNAUTHORIZED.value(), "Faça login novamente", null);
    }

    @ExceptionHandler(AutoInativacaoException.class)
    public Response<?> handleAutoInativacao(AutoInativacaoException ex) {
        return new Response<>(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), null);
    }

    @ExceptionHandler(InativaUltimoUsuarioException.class)
    public Response<?> handleInativaUltimoUsuario(InativaUltimoUsuarioException ex) {
        return new Response<>(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), null);
    }

    @ExceptionHandler(AutoRedirecionamentoException.class)
    public Response<?> handleAutoDirecionamento(AutoRedirecionamentoException ex) {
        return new Response<>(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), null);
    }

    @ExceptionHandler(FuncionarioMenor18AnosException.class)
    public Response<?> handleFuncionarioMenor(FuncionarioMenor18AnosException ex) {
        return new Response<>(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), null);
    }

    @ExceptionHandler(RuntimeException.class)
    public Response<?> handleRuntime(RuntimeException ex) {
        return Responses.fromException(ex);
    }

}
