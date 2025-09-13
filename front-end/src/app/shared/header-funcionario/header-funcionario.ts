import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-header-funcionario',
  imports: [RouterLink, ThemeToggleComponent],
  templateUrl: './header-funcionario.html',
  styleUrl: './header-funcionario.css'
})
export class HeaderFuncionario {

}