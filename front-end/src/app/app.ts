import { Component, signal } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/toast-component/toast-component';
import { Footer } from './shared/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-end');
}
