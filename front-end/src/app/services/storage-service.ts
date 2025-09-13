import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  salvarDados(chave: string, valor: any): void {
    localStorage.setItem(chave, JSON.stringify(valor));
  }

  getDados(chave: string): any[] {
    const dados = localStorage.getItem(chave);

    if (dados !== null) {
      return JSON.parse(dados);
    } else {
      return [];
    }
  }

  removerItem(chave: string): void {
    localStorage.removeItem(chave);
  }
}
