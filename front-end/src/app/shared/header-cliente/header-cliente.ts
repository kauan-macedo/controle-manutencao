import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-header-cliente',
  imports: [RouterLink, ThemeToggleComponent],
  templateUrl: './header-cliente.html',
  styleUrl: './header-cliente.css'
})
export class HeaderCliente {

}
