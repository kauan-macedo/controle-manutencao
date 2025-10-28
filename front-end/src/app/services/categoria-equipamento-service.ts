import { Injectable } from '@angular/core';
import { CategoriaEquipamento } from '../models/categoria-equipamento';
import { atualizarCategoria, buscaCategoria, buscarCategorias, novaCategoria } from '../../api/categoria';
import { APIResponse } from '../../api/api';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const LS_KEY = "categoriasEquipamento";

@Injectable({
  providedIn: 'root'
})

export class CategoriaEquipamentoService {

  private BASE_URL = "https://controlemanutencao.betoni.dev/categoria";
  
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'credentials': 'include'
    })
  }
  
  constructor(private httpClient: HttpClient){}
  
  // Observable
  listarTodas(): Observable<CategoriaEquipamento[]> {
    return this.httpClient.get<CategoriaEquipamento[]>(
      this.BASE_URL,
      this.httpOptions
    )
  }
  
  /* PROMISE
  async listarTodas(onError?: (msg: string) => void): Promise<CategoriaEquipamento[]> {
    let resp = await buscarCategorias();
    if(resp.error && onError) {
      onError(resp.message)
    }
    return resp.body
  };
  */

  // Observable
  inserir(categoria: CategoriaEquipamento): Observable<CategoriaEquipamento> {
    return this.httpClient.post<CategoriaEquipamento>(
      this.BASE_URL,
      JSON.stringify(categoria),
      this.httpOptions
    )
  }

  /* PROMISE
  async inserir(descricao: string, onError?: (msg: string) => void): Promise<any> {
    let resp = await novaCategoria(descricao);
    if(resp.error && onError) {
      onError(resp.message)
    }
    return resp.body
  };
  */  

  // Observable
  buscarPorId(id: number): Observable<CategoriaEquipamento>{
    return this.httpClient.get<CategoriaEquipamento>(
      this.BASE_URL + "/" + id,
      this.httpOptions
    )
  }

  /* PROMISE
  async buscarPorId(id: number, onError?: (msg: string) => void): Promise<CategoriaEquipamento> {
    let resp = await buscaCategoria(id);
    if(resp.error && onError) {
      onError(resp.message)
    }
    return resp.body
  }
  */

  // Observable
  atualizar(id: number, desc: string): Observable<CategoriaEquipamento>{
    return this.httpClient.put<CategoriaEquipamento>(
      this.BASE_URL + "/" + id,
      this.httpOptions
    )
  }

  /* PROMISE
  async atualizar(id: number, desc: string, onError?: (msg: string) => void): Promise<any> {
    let resp = await atualizarCategoria(id, desc);
    if(resp.error && onError) {
      onError(resp.message)
    }
    return resp.body
  };
  */

  // Observable
  remover(id: number): Observable<CategoriaEquipamento>{
    return this.httpClient.delete<CategoriaEquipamento>(
      this.BASE_URL + "/" + id,
      this.httpOptions
    )
  }

  /* PROMISE
  async remover(id: number, onError?: (msg: string) => void): Promise<any> {
    let resp = await atualizarCategoria(id, "");
    if(resp.error && onError) {
      onError(resp.message)
    }
    return resp.body
  };
  */
}
