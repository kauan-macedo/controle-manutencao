import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new Subject<{ message: string, visible: boolean }>();
  toastState = this.toastSubject.asObservable();

  constructor() {}

  showSuccess(message: string) {
    this.toastSubject.next({ message, visible: true });
    setTimeout(() => {
      this.toastSubject.next({ message: '', visible: false });
    }, 3000);
  }
}