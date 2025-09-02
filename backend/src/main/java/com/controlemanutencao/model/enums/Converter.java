package com.controlemanutencao.model.enums;

import jakarta.persistence.AttributeConverter;

public class Converter {

    public static class StatusSolicitacaoConverter implements AttributeConverter<StatusSolicitacao, Short> {

        @Override
        public Short convertToDatabaseColumn(StatusSolicitacao statusSolicitacao) {
            return statusSolicitacao.getId();
        }

        @Override
        public StatusSolicitacao convertToEntityAttribute(Short integer) {
            return StatusSolicitacao.fromId((short) integer);
        }
    }

}
