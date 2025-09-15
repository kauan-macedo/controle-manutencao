import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggle } from '../../../shared/theme-toggle/theme-toggle';

@Component({
  selector: 'app-login',
  imports: [ RouterLink, ThemeToggle ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

}
