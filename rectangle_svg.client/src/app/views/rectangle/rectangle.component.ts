import { Component, OnInit } from '@angular/core';
import { RectangleService } from '../../services/rectangle.service';
import { RectangleData } from '../../interfaces/rectangle.model';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrl: './rectangle.component.css',
})
export class RectangleComponent implements OnInit {
  constructor(
    private rectangleService: RectangleService,
    private toastService: ToastService
  ) {}

  rectangle!: RectangleData;
  startX = 0;
  startY = 0;
  startWidth = 0;
  startHeight = 0;

  isResizing = false;
  isDragging = false;

  showConfirmationPopUp = false;

  // Assuming 1 cm is equivalent to approximately 37.8 pixels
  pixelsPerCm = 37.8;

  ngOnInit(): void {
    this.onGetInitialRectangleData();
  }

  onGetInitialRectangleData() {
    this.rectangleService.getInitialRectangleData().subscribe({
      next: (result: RectangleData) => {
        this.rectangle = result;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onResetRectangleData() {
    this.rectangleService.updateRectangleData(this.rectangle).subscribe({
      next: () => {
        this.toastService.showToast('Updated successfully!', 'success');
      },
      error: (err: any) => {
        this.toastService.showToast(err, 'error');
      },
    });
  }
  /**
   * Handles the dragging functionality on the SVG container during mousedown event.
   * Sets up initial values for dragging based on the mouse position and the current rectangle position.
   * @param event The MouseEvent representing the mouse down event.
   */
  handleDrag(event: MouseEvent): void {
    if (!this.isResizing) {
      this.startX = event.clientX - this.rectangle.x;
      this.startY = event.clientY - this.rectangle.y;
      this.isDragging = true;
    }
  }

  /**
   * Handles the resizing of the rectangle while dragging the mouse.
   * Updates the position of the rectangle based on the mouse movement.
   * @param event The MouseEvent representing the mouse move event.
   */
  handleDragResize(event: MouseEvent): void {
    if (this.isDragging && !this.isResizing) {
      this.rectangle.x = event.clientX - this.startX;
      this.rectangle.y = event.clientY - this.startY;
    }
  }

  handleResize(event: MouseEvent): void {
    this.isResizing = true;
    this.startWidth = this.rectangle.width;
    this.startHeight = this.rectangle.height;
    this.startX = event.clientX;
    this.startY = event.clientY;

    // // Prevent default behavior to avoid text selection during resize
    event.preventDefault();
  }

  handleResizeMove(event: MouseEvent): void {
    if (this.isResizing) {
      // Calculate the new width and height based on mouse movement
      const deltaX = event.clientX - this.startX;
      const deltaY = event.clientY - this.startY;

      // Update rectangle dimensions
      this.rectangle.width = Math.max(0, this.startWidth + deltaX);
      this.rectangle.height = Math.max(0, this.startHeight + deltaY);
    }
  }

  handleMouseUp(): void {
    // Stop resizing or dragging when releasing the mouse button
    this.isResizing = false;
    this.isDragging = false;
  }

  calculatePerimeter(): number {
    return Math.round(
      2 *
        (this.roundValueInCm(this.rectangle.width) +
          this.roundValueInCm(this.rectangle.height))
    );
  }

  onButtonClick() {
    this.showConfirmationPopUp = true;
  }

  onConfirmationEvent(event: boolean) {
    if (event) {
      this.onResetRectangleData();
    }
    this.showConfirmationPopUp = false;
  }

  roundValueInCm(value: number): number {
    return Math.round(value / this.pixelsPerCm);
  }
}
