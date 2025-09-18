import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { faComputer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-header-funcionario',
  imports: [RouterLink, ThemeToggle, FontAwesomeModule],
  templateUrl: './header-funcionario.html',
  styleUrl: './header-funcionario.css'
})
export class HeaderFuncionario {
  faComputer = faComputer; //ícone que será mostrado no header
}