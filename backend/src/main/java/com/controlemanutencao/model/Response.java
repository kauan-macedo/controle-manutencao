package com.controlemanutencao.model;

public record Response<T>(int status, String message, T body) {}
