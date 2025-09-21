import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-funcionario-mostrar-relatorio-receitas',
  imports: [CommonModule, RouterModule, DatePipe, FormsModule],
  templateUrl: './funcionario-mostrar-relatorio-receitas.html',
  styleUrl: './funcionario-mostrar-relatorio-receitas.css'
})
export class FuncionarioMostrarRelatorioReceitas implements OnInit{

  dataInicial: string = '';
  dataFinal: string = '';

  registros = [
    { data: new Date('2025-01-05'), receita: 850 },
    { data: new Date('2025-01-12'), receita: 1750 },
    { data: new Date('2025-02-03'), receita: 2200 },
    { data: new Date('2025-02-10'), receita: 1420 },
    { data: new Date('2025-02-18'), receita: 1960 },
    { data: new Date('2025-03-01'), receita: 3150 },
    { data: new Date('2025-03-07'), receita: 1250 },
    { data: new Date('2025-03-15'), receita: 2890 },
    { data: new Date('2025-04-02'), receita: 3320 },
    { data: new Date('2025-04-18'), receita: 2780 },
    { data: new Date('2025-05-05'), receita: 4100 },
    { data: new Date('2025-05-12'), receita: 900 },
    { data: new Date('2025-05-27'), receita: 1370 },
    { data: new Date('2025-06-03'), receita: 2450 },
    { data: new Date('2025-06-20'), receita: 3150 },
    { data: new Date('2025-07-08'), receita: 1820 },
    { data: new Date('2025-07-19'), receita: 2670 },
    { data: new Date('2025-08-02'), receita: 1980 },
    { data: new Date('2025-08-14'), receita: 3540 },
    { data: new Date('2025-08-29'), receita: 2760 }
  ];

  registrosFiltrados = [...this.registros];

  aplicarFiltro(){
    let dip = this.dataInicial.split('-');  //Data Inicial Partes
    let dfp = this.dataFinal.split('-');    //Data Final Partes
    console.log(dip);

    let dataInicialCorrigida = new Date(+dip[0], +dip[1]-1, +dip[2]);
    let dataFinalCorrigida = new Date(+dfp[0], +dfp[1]-1, +dfp[2]);

    console.log("Data Inicial -----> " + dataInicialCorrigida);
    console.log("Data Final -------> " + dataFinalCorrigida);

    this.registrosFiltrados = this.registros.filter(s => {
      if(this.dataInicial && this.dataFinal){
        return (new Date(s.data.setHours(0, 0, 0, 0))) >= (dataInicialCorrigida) && (new Date(s.data.setHours(0, 0, 0, 0))) <= (dataFinalCorrigida);
      }else if(this.dataInicial){
        return (new Date(s.data.setHours(0, 0, 0, 0))) >= (dataInicialCorrigida);
      }else if(this.dataFinal){
        return (new Date(s.data.setHours(0, 0, 0, 0))) <= (dataFinalCorrigida);
      }else{
        return this.registrosFiltrados = [...this.registros];
      }
    });
    
  }

    gerarPDF() {
      const doc = new jsPDF();

      // título
      doc.setFontSize(16);
      doc.text("Relatório de Receitas", 14, 20);

      // período do filtro
      const periodo = `Período: ${this.dataInicial || 'Início'} até ${this.dataFinal || 'Fim'}`;
      doc.setFontSize(11);
      doc.text(periodo, 14, 30);

      // cabeçalho da tabela
      let startY = 40;
      doc.setFontSize(12);
      doc.text("Data", 14, startY);
      doc.text("Receita (R$)", 80, startY);

      // linhas da tabela
      startY += 10;
      this.registrosFiltrados.forEach(r => {
        doc.text(new Date(r.data).toLocaleDateString('pt-BR'), 14, startY);
        doc.text(r.receita.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }), 80, startY);
        startY += 10;
      });

      // salva o PDF
      doc.save("relatorio-receitas.pdf");
    }


  ngOnInit(): void {
    
  }

}
