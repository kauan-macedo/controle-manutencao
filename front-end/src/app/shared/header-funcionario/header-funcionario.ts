import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-header-funcionario',
  imports: [RouterLink, ThemeToggle],
  templateUrl: './header-funcionario.html',
  styleUrl: './header-funcionario.css'
})
export class HeaderFuncionario {

}