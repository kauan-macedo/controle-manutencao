import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { RelatorioService, RelatorioReceitaCategoria } from '../../../services/relatorio-service';
import {LoadingOverlayComponent} from '../../../shared/loading-overlay.component';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-funcionario-mostrar-relatorio-receitas-categoria',
  imports: [CommonModule, FormsModule, LoadingOverlayComponent],
  templateUrl: './funcionario-mostrar-relatorio-receitas-categoria.html',
  styleUrl: './funcionario-mostrar-relatorio-receitas-categoria.css'
})
export class FuncionarioMostrarRelatorioReceitasCategoria implements OnInit{

  loading = false;

  constructor(private relatorioService: RelatorioService, private router: Router, private cdr: ChangeDetectorRef){}

  registros: RelatorioReceitaCategoria[] = [];

  registrosTabela: { categoria: string, receita: number }[] = [];

  registrosCategoria = Object.entries(this.registrosTabela);

    gerarPDF() {
      const doc = new jsPDF();

      // título
      doc.setFontSize(24);
      doc.setTextColor(12, 24, 33);
      doc.text("Relatório de Receitas por Categoria", 14, 15);
      doc.setDrawColor(220, 220, 220);
      doc.line(2, 20, 208, 20);

      // cabeçalho da tabela
      let startY = 40;
      doc.setFontSize(14);
      doc.text("Categoria", 14, startY);
      doc.text("Receita Total", 140, startY);

      doc.setFontSize(14);
      startY += 10;

      // linhas da tabela
      for(let i=0; i<this.registrosTabela.length; i++){
        let registro = this.registrosTabela[i];
        doc.text(registro.categoria, 14, startY);
        doc.text(registro.receita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 140, startY);
        doc.setDrawColor(220, 220, 220);
        doc.line(14, startY-7, 195, startY-7);
        startY += 10;
      }

      // salva o PDF
      doc.save("relatorio-receitas.pdf");
    }


  ngOnInit(): void {
    this.loading = true;
    this.relatorioService.getRelatorioReceitasCategoria()
    .pipe(finalize(() => this.endLoad()))
    .subscribe(data => {
      this.registros = data;

      this.registrosTabela = Object.entries(this.relatorioService.agruparRegistros(this.registros))
      .map(([ categoria, receita ]) => ({
        categoria,
        receita
      }));
      this.registrosCategoria = Object.entries(this.registrosTabela);
      this.cdr.detectChanges();
    })
  }

   endLoad = () => {
    setTimeout(() => {
      this.loading = false;
      this.cdr.detectChanges();
    })
  }

  redirecionarReceita(){
    this.router.navigate(['/funcionario/mostrar-relatorio-receitas']);
  }
}
