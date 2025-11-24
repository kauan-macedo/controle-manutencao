import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL, APIResponse } from '../../api/api';
import { Categoria } from '../models/categoria-equipamento';

export interface RelatorioReceita {
  data: string;
  receita: number;
}

export interface RelatorioReceitaCategoria { 
  categoria: string,
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

  getRelatorioReceitas(de: string, ate: string): Observable<APIResponse<RelatorioReceita[]>> {
    let params = new HttpParams();
    params = de == null || de.trim() == "" ? params : params.append('de', de);
    params = ate == null || ate.trim() == "" ? params : params.append('ate', ate);
    return this.httpClient.get<APIResponse<RelatorioReceita[]>>(
      API_URL + '/api/relatorios/receitas',
      {...this.httpOptions, params: params}
    );
  }

  getRelatorioReceitasCategoria(): Observable<APIResponse<RelatorioReceitaCategoria[]>>{
    return this.httpClient.get<APIResponse<RelatorioReceitaCategoria[]>>(
      API_URL + '/api/relatorios/receitasCategoria',
      this.httpOptions
    )
  }

  agruparRegistros(registros: RelatorioReceitaCategoria[]): Record<string, number>{

    let registrosFormatados = registros.map(r => ({
      categoria: r.categoria,
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