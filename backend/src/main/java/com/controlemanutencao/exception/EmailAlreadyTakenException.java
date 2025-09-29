package com.controlemanutencao.exception;

public class EmailAlreadyTakenException extends RuntimeException {
    public EmailAlreadyTakenException() {
        super("Email fornecido já está em uso.");
    }
}
