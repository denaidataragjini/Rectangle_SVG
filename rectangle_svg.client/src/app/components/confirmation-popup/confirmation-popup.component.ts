import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrl: './confirmation-popup.component.css',
})
export class ConfirmationPopupComponent {
  @Output() confirmed = new EventEmitter<boolean>();
  @Input() description = '';

  confirmAction() {
    this.confirmed.emit(true);
  }

  cancelAction() {
    this.confirmed.emit(false);
  }
}
