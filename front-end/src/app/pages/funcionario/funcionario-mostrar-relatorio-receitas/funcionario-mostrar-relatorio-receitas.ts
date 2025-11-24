import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { RelatorioService, RelatorioReceita } from '../../../services/relatorio-service';
import {LoadingOverlayComponent} from '../../../shared/loading-overlay.component';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-funcionario-mostrar-relatorio-receitas',
  imports: [CommonModule, DatePipe, FormsModule, LoadingOverlayComponent],
  templateUrl: './funcionario-mostrar-relatorio-receitas.html',
  styleUrl: './funcionario-mostrar-relatorio-receitas.css'
})
export class FuncionarioMostrarRelatorioReceitas implements OnInit{

  dataInicial: string = '';
  dataFinal: string = '';
  categoriaSelecionada: string = '';

  categorias = ['Computador', 'Impressora', 'Monitor', 'Notebook',' Projetor'];

  registros: RelatorioReceita[] = [];

  registrosFiltrados = [...this.registros];

  loading = false;

  constructor(private relatorioService: RelatorioService, private router: Router, private cdr: ChangeDetectorRef) {}

  aplicarFiltro(){
    let dip = this.dataInicial.split('-');
    let dfp = this.dataFinal.split('-');

    let dataInicialCorrigida = new Date(+dip[0], +dip[1]-1, +dip[2]);
    let dataFinalCorrigida = new Date(+dfp[0], +dfp[1]-1, +dfp[2]);

    this.registrosFiltrados = this.registros.filter(s => {
      const dataRegistro = new Date(s.data);
      dataRegistro.setHours(0, 0, 0, 0);

      if(this.dataInicial && this.dataFinal){
        return dataRegistro >= dataInicialCorrigida && dataRegistro <= dataFinalCorrigida;
      }else if(this.dataInicial){
        return dataRegistro >= dataInicialCorrigida;
      }else if(this.dataFinal){
        return dataRegistro <= dataFinalCorrigida;
      }else{
        return true;
      }
    });
  }

    /** Palheta pastel
     * 
     * (247, 244, 234) - Creme
     * (222, 217, 226) - Creme meio roxo
     * (192, 185, 221) - Roxo
     * (12, 24, 33)    - Azul muito escuro
     * (27, 42, 65)    - Azul escuro
     * (128, 161, 212) - Azul
     * (117, 201, 200) - Verde
     * (232, 248, 255) - Azul bem claro
     */


    gerarPDF() {
      const doc = new jsPDF();

      // título
      doc.setFontSize(24);
      doc.setTextColor(12, 24, 33);
      doc.text("Relatório de Receitas", 14, 15);
      doc.setDrawColor(220, 220, 220);
      doc.line(2, 20, 208, 20);

      // período do filtro
      const periodo = `Período: ${this.dataInicial || 'Início'} até ${this.dataFinal || 'Fim'}`;
      doc.setTextColor(12, 24, 33);
      doc.setFontSize(14);
      doc.text(periodo, 14, 30);

      // cabeçalho da tabela
      let startY = 40;
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(14);
      doc.text("Data", 14, startY);
      doc.text("Receita", 140, startY);
      doc.setDrawColor(220, 220, 220);
      //doc.line(5, 32, 204, 32);

      // linhas da tabela
      startY += 10;
      this.registrosFiltrados.forEach(r => {
        doc.text(new Date(r.data).toLocaleDateString('pt-BR'), 14, startY);
        doc.text(r.receita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 140, startY);
        doc.setDrawColor(220, 220, 220);
        doc.line(14, startY-7, 195, startY-7);
        startY += 10;
      });

      // salva o PDF
      doc.save("relatorio-receitas.pdf");
    }


  ngOnInit(): void {
    this.loading = true;
    this.relatorioService.getRelatorioReceitas()
    .pipe(finalize(() => this.endLoad()))
    .subscribe(data => {
      this.registros = data;
      this.registrosFiltrados = [...this.registros];
    });
  }

  endLoad = () => {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    })
  }

  redirecionarCategoria(){
    this.router.navigate(['/funcionario/mostrar-relatorio-receitas-categoria']);
  }
}