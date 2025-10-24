import { Injectable } from '@angular/core';
import { CategoriaEquipamento } from '../models/categoria-equipamento';
import { atualizarCategoria, buscaCategoria, buscarCategorias, novaCategoria } from '../../api/categoria';
import { APIResponse } from '../../api/api';

const LS_KEY = "categoriasEquipamento";

@Injectable({
  providedIn: 'root'
})

export class CategoriaEquipamentoService {
  
  async listarTodas(onError?: (msg: string) => void): Promise<CategoriaEquipamento[]> {
    let resp = await buscarCategorias();
    if(resp.error && onError) {
      onError(resp.message)
    }
    return resp.body
  };

  async inserir(descricao: string, onError?: (msg: string) => void): Promise<any> {
    let resp = await novaCategoria(descricao);
    if(resp.error && onError) {
      onError(resp.message)
    }
    return resp.body
  };  

  async buscarPorId(id: number, onError?: (msg: string) => void): Promise<CategoriaEquipamento> {
    let resp = await buscaCategoria(id);
    if(resp.error && onError) {
      onError(resp.message)
    }
    return resp.body
  }

  async atualizar(id: number, desc: string, onError?: (msg: string) => void): Promise<any> {
    let resp = await atualizarCategoria(id, desc);
    if(resp.error && onError) {
      onError(resp.message)
    }
    return resp.body
  };

  async remover(id: number, onError?: (msg: string) => void): Promise<any> {
    let resp = await atualizarCategoria(id, "");
    if(resp.error && onError) {
      onError(resp.message)
    }
    return resp.body
  };
}
