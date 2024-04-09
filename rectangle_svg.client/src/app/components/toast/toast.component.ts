import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent implements OnInit {
  message!: string;
  type!: 'success' | 'error';

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.toastService.getToast().subscribe((toast) => {
      if (toast) {
        console.log('erdha');
        this.message = toast.message;
        this.type = toast.type;
        setTimeout(() => {
          this.message = '';
        }, 3000); // Clear message after 3 seconds
      }
    });
  }
}
