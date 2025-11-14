package com.controlemanutencao.exception;

public class AutoRedirecionamentoException extends RuntimeException {
    public AutoRedirecionamentoException() {
        super("Não é permitidor redirecionar a solicitação para si mesmo.");
    }
}
