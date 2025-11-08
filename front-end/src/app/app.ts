import { Component, signal } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { Footer } from './shared/footer/footer';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastNoAnimationModule, ToastrModule, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-end');
}
