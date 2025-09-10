import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderFuncionario } from '../../../shared/header-funcionario/header-funcionario';

@Component({
  selector: 'app-funcionario-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderFuncionario],
  templateUrl: './funcionario-layout.html',
  styleUrl: './funcionario-layout.css'
})
export class FuncionarioLayout {
}