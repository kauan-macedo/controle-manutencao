import { Injectable } from '@angular/core';
import { CategoriaEquipamento } from '../models/categoria-equipamento';

Injectable({
  providedIn: 'root'
})

const LS_KEY = "categoriasEquipamento";

export class CategoriaEquipamentoService {
  
  listarTodas(): CategoriaEquipamento[] {
    const categorias = localStorage[LS_KEY];

    //return categorias ? JSON.parse(categorias) : [];
    return [
      { id: 1, nome: 'Notebook' },
      { id: 2, nome: 'Impressora' },
      { id: 3, nome: 'Desktop' },
      { id: 4, nome: 'TesteJP' }
    ];
  };

  inserir(categoria: CategoriaEquipamento): void {
    const categorias = this.listarTodas();

    categorias.push(categoria);

    localStorage[LS_KEY] = JSON.stringify(categorias);
  }

  buscarPorId(id: number): CategoriaEquipamento | undefined {
    const categorias = this.listarTodas();
    return categorias.find(categoria => categoria.id == id);
  }

  atualizar(categoria: CategoriaEquipamento): void {
    let categorias = this.listarTodas();

    categorias.forEach( (obj, index, objs) => {
      if(obj.id == categoria.id){
        objs[index] = categoria;
      }
    });

    localStorage[LS_KEY] = JSON.stringify(categorias);
  };

  remover(id: number): void {
    let categorias = this.listarTodas();

    categorias.filter(obj => obj.id !== id);

    localStorage[LS_KEY] = JSON.stringify(categorias);
  };
}
