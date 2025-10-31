package com.controlemanutencao.dto;

import com.controlemanutencao.model.Categoria;
import com.controlemanutencao.repository.Converter;
import jakarta.persistence.*;

public record CategoriaDTO(Long id, String descricao, boolean ativo) {
    public static CategoriaDTO from(Categoria cat) {
        return cat == null ? null : new CategoriaDTO(cat.getId(), cat.getDescricao(), cat.isAtivo());
    }
}
