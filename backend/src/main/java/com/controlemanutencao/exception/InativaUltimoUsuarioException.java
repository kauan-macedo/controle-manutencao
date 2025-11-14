package com.controlemanutencao.exception;

public class InativaUltimoUsuarioException extends RuntimeException {
    public InativaUltimoUsuarioException() {
        super("Não é permitido inativar o último usuário.");
    }
}
