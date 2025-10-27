package com.controlemanutencao.repository;

import com.controlemanutencao.model.enums.StatusSolicitacao;
import com.controlemanutencao.model.enums.TipoUsuario;
import jakarta.persistence.AttributeConverter;

public class Converter {

    public static class StatusSolicitacaoConverter implements AttributeConverter<StatusSolicitacao, Short> {

        @Override
        public Short convertToDatabaseColumn(StatusSolicitacao statusSolicitacao) {
            if (statusSolicitacao == null) {
                return null;
            }
            return statusSolicitacao.getId();
        }

        @Override
        public StatusSolicitacao convertToEntityAttribute(Short integer) {
            if (integer == null) {
                return null;
            }
            return StatusSolicitacao.fromId(integer.shortValue());
        }
    }

    public static class TipoUsuarioConverter implements AttributeConverter<TipoUsuario, Integer> {

        @Override
        public Integer convertToDatabaseColumn(TipoUsuario t) {
            return t.getId();
        }

        @Override
        public TipoUsuario convertToEntityAttribute(Integer integer) {
            return TipoUsuario.fromId(integer);
        }
    }

    public static class BooleanToIntegerConverter implements AttributeConverter<Boolean, Integer> {
        @Override
        public Integer convertToDatabaseColumn(Boolean attribute) {
            if (attribute == null) {
                return null;
            }
            return (attribute ? 1 : 0);
        }

        @Override
        public Boolean convertToEntityAttribute(Integer dbData) {
            if (dbData == null) {
                return null;
            }
            return dbData.equals(1);
        }
    }

}
