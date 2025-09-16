import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../services/toast-service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast-component.html',
  styleUrl: './toast-component.css'
})
export class ToastComponent implements OnInit {
  message: string = '';
  visible: boolean = false;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toastService.toastState.subscribe(
      (state) => {
        this.message = state.message;
        this.visible = state.visible;
      }
    );
  }

  hide() {
    this.visible = false;
  }
}