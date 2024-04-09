import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  constructor() {}

  getToast() {
    return this.toastSubject.asObservable();
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toastSubject.next({ message, type });
    setTimeout(() => {
      this.hideToast();
    }, 3000);
  }

  hideToast() {
    this.toastSubject.next(null);
  }
}
