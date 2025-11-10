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
  categoria: Categoria,
  receita: number
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

  agruparRegistros(registros: RelatorioReceitaCategoria[]): Record<string, number>{

    let registrosFormatados = registros.map(r => ({
      categoria: r.categoria.descricao,
      receita: r.receita
    }));

    let categoriaSoma: Record<string, number> = {};
    registrosFormatados.forEach(r => {
        let cat = r.categoria;
        let rec = r.receita;
        
        if(!categoriaSoma[cat]){
          categoriaSoma[cat] = 0;
        }

        categoriaSoma[cat] += rec;
    });

    return categoriaSoma;
  }

}