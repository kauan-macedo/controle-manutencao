package com.controlemanutencao.controller.advice;

import com.controlemanutencao.exception.CEPInvalidoException;
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

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Response<?>> handleRuntime(RuntimeException ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Responses.fromException(ex));
    }

}
