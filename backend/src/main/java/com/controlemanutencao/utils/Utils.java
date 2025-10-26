package com.controlemanutencao.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.function.Consumer;

public class Utils {

    public static final DateTimeFormatter DT_FORMATTER_DETAIL = DateTimeFormatter.ofPattern("dd/MM/yyyy hh:mm:ss");
    public static long timestampNow() {
        return System.currentTimeMillis();
    }

    public static <T> void ifNotNull(T o, Consumer<T> c) {
        if(o != null) {
            c.accept(o);
        }
    }

    public static boolean isFuture(String date) {
        LocalDate dataRecebida = LocalDate.parse(date, DT_FORMATTER_DETAIL);
        LocalDate amanha = LocalDate.now().plusDays(1);
        return dataRecebida.isAfter(amanha) || dataRecebida.isEqual(amanha);
    }

    public static Long toUnix(String date) {
        LocalDateTime dataRecebida = LocalDateTime.parse(date, DT_FORMATTER_DETAIL);
        return dataRecebida.toEpochSecond(ZoneOffset.ofHours(-3));
    }

}
