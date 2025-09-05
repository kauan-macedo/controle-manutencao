package com.controlemanutencao.http.response;

import com.controlemanutencao.model.Response;
import org.springframework.http.HttpStatus;

public class Responses {

    public static Response<?> PREENCHA_TODOS_OS_CAMPOS = new Response<>(
            HttpStatus.BAD_REQUEST.value(),
            "Preencha todos os campos.",
            null
    );

    public static Response<?> fromException(Throwable ex) {
        ex.printStackTrace();
        return new Response<>(
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                "Algo deu errado. Tente novamente em alguns instantes.",
                null
        );
    }

}
