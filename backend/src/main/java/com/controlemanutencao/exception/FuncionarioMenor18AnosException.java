package com.controlemanutencao.exception;

public class FuncionarioMenor18AnosException extends RuntimeException {
    public FuncionarioMenor18AnosException() {
        super("Funcionário deve ser maior de 18 anos.");
    }
}
