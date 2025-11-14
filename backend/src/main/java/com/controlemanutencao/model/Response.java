package com.controlemanutencao.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Response<T> {
    private boolean error;
    private String message;
    private T body;

    @JsonIgnore
    private int status;

    public Response(int status, String message, T body) {
        this.message = message;
        this.body = body;
        this.status = status;
        this.error = status >= 400;
    }

    public boolean isError() {
        return error;
    }

    public String getMessage() {
        return message;
    }

    public T getBody() {
        return body;
    }

    public int getStatus() {
        return status;
    }


}
