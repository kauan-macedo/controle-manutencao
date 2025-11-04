package com.controlemanutencao.utils;

import java.time.*;
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

    public static String parseMillis(Long millis, DateTimeFormatter formatter) {
        if(millis == null) {
            return null;
        }
        Instant instant = Instant.ofEpochMilli(millis);
        ZoneId zoneUTC3 = ZoneId.of("Etc/GMT+3");
        ZonedDateTime zonedDateTime = instant.atZone(zoneUTC3);
        return zonedDateTime.format(formatter);
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
