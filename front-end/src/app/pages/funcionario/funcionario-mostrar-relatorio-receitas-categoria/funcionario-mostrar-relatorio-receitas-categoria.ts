import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-funcionario-mostrar-relatorio-receitas-categoria',
  imports: [CommonModule, RouterModule, DatePipe, FormsModule],
  templateUrl: './funcionario-mostrar-relatorio-receitas-categoria.html',
  styleUrl: './funcionario-mostrar-relatorio-receitas-categoria.css'
})
export class FuncionarioMostrarRelatorioReceitasCategoria implements OnInit{

  registros = [
    { categoria: 'notebook',  data: new Date('2025-01-05'), receita: 850 },
    { categoria: 'fone',      data: new Date('2025-01-12'), receita: 1750 },
    { categoria: 'monitor',   data: new Date('2025-02-03'), receita: 2200 },
    { categoria: 'mouse',     data: new Date('2025-02-10'), receita: 1420 },
    { categoria: 'teclado',   data: new Date('2025-02-18'), receita: 1960 },
    { categoria: 'notebook',  data: new Date('2025-03-01'), receita: 3150 },
    { categoria: 'fone',      data: new Date('2025-03-07'), receita: 1250 },
    { categoria: 'monitor',   data: new Date('2025-03-15'), receita: 2890 },
    { categoria: 'mouse',     data: new Date('2025-04-02'), receita: 3320 },
    { categoria: 'teclado',   data: new Date('2025-04-18'), receita: 2780 },
    { categoria: 'notebook',  data: new Date('2025-05-05'), receita: 4100 },
    { categoria: 'fone',      data: new Date('2025-05-12'), receita: 900 },
    { categoria: 'monitor',   data: new Date('2025-05-27'), receita: 1370 },
    { categoria: 'mouse',     data: new Date('2025-06-03'), receita: 2450 },
    { categoria: 'teclado',   data: new Date('2025-06-20'), receita: 3150 },
    { categoria: 'notebook',  data: new Date('2025-07-08'), receita: 1820 },
    { categoria: 'fone',      data: new Date('2025-07-19'), receita: 2670 },
    { categoria: 'monitor',   data: new Date('2025-08-02'), receita: 1980 },
    { categoria: 'mouse',     data: new Date('2025-08-14'), receita: 3540 },
    { categoria: 'teclado',   data: new Date('2025-08-29'), receita: 2760 }
  ];

  agruparRegistros(){
    let categoriaSoma: Record<string, number> = {};
    this.registros.forEach(r => {
        let cat = r.categoria;
        let rec = r.receita;
        
        if(!categoriaSoma[cat]){
          categoriaSoma[cat] = 0;
        }

        categoriaSoma[cat] += rec;
    });

    return categoriaSoma;
  }
  
  registrosTabela = this.agruparRegistros();

  registrosCategoria = Object.entries(this.registrosTabela);

    gerarPDF() {
      const doc = new jsPDF();

      // título
      doc.setFontSize(16);
      doc.text("Relatório de Receitas", 14, 20);

      // cabeçalho da tabela
      let startY = 40;
      doc.setFontSize(12);
      doc.text("Categoria", 14, startY);
      doc.text("Receita Total", 80, startY);

      startY += 10;

      // linhas da tabela
      for(let cat in this.registrosTabela){
        doc.text(cat, 14, startY);
        doc.text(this.registrosTabela[cat].toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 80, startY);
        startY += 10;
      }

      // salva o PDF
      doc.save("relatorio-receitas.pdf");
    }


  ngOnInit(): void {
    
  }

}
