package com.controlemanutencao.controller.advice;

import com.controlemanutencao.exception.CEPInvalidoException;
import com.controlemanutencao.exception.DeveSerFuncionarioException;
import com.controlemanutencao.exception.EmailAlreadyTakenException;
import com.controlemanutencao.exception.EstadoIlegalSolicitacaoException;
import com.controlemanutencao.http.response.Responses;
import com.controlemanutencao.model.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Response<?>> handleValidationErrors(MethodArgumentNotValidException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Responses.PREENCHA_TODOS_OS_CAMPOS);

    }

    @ExceptionHandler(CEPInvalidoException.class)
    public ResponseEntity<Response<?>> handleCEPInvalidoException(CEPInvalidoException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Responses.CEP_INVALIDO);

    }

    @ExceptionHandler(EmailAlreadyTakenException.class)
    public ResponseEntity<Response<?>> handleEmailAlreadyTakenException(EmailAlreadyTakenException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(Responses.EMAIL_EM_USO);
    }

    @ExceptionHandler(DeveSerFuncionarioException.class)
    public ResponseEntity<Response<?>> handleDeveSerFuncionarioException(DeveSerFuncionarioException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(Responses.DEVE_SER_FUNCIONARIO);
    }


    @ExceptionHandler(EstadoIlegalSolicitacaoException.class)
    public ResponseEntity<Response<?>> handleEstadoIlegalSolicitacaoException(EstadoIlegalSolicitacaoException ex) {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(new Response<>(HttpStatus.FORBIDDEN.value(), ex.getMessage(), null));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Response<?>> handleRuntime(RuntimeException ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Responses.fromException(ex));
    }

}
