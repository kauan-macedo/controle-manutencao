package com.controlemanutencao.exception;

public class AutoInativacaoException extends RuntimeException {
    public AutoInativacaoException() {
        super("Não é permitido inativar seu próprio perfil.");
    }
}
