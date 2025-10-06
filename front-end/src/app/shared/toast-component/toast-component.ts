import { Component, OnInit } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ToastService } from '../../services/toast-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, AsyncPipe], 
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css'
})
export class ToastComponent implements OnInit {
  toastState$: Observable<{ message: string, visible: boolean }> = new Observable();

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastState$ = this.toastService.toastState;
  }

  hide() {
    this.toastService.hide();
  }
}