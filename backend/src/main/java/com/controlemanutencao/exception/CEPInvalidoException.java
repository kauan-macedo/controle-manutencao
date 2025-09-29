package com.controlemanutencao.exception;

public class CEPInvalidoException extends RuntimeException {
  public CEPInvalidoException() {
    super("CEP fornecido é inválido.");
  }
}
