import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from '../../api/api';
import { Categoria } from '../models/categoria-equipamento';

export interface RelatorioReceita {
  data: Date;
  receita: number;
}

export interface RelatorioReceitaCategoria { 
  receita: number;
  categoria: Categoria
}

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  }

  constructor(private httpClient: HttpClient) { }

  getRelatorioReceitas(): Observable<RelatorioReceita[]> {
    return this.httpClient.get<{ data: string, receita: number }[]>(
      API_URL + '/api/relatorios/receitas',
      this.httpOptions
    ).pipe(
      map(response => response.map(item => ({
        ...item,
        data: new Date(item.data)
      })))
    );
  }

  getRelatorioReceitasCategoria(): Observable<RelatorioReceitaCategoria[]>{
    return this.httpClient.get<{ receita: number, categoria: Categoria }[]>(
      API_URL + '/api/relatorios/receitasCategoria',
      this.httpOptions
    ).pipe(
      map(response => response.map(item => ({
        ...item
      })))
    )
  }

}