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

  // Assuming 1 cm is equivalent to 37.8 pixels
  pixelsPerCm = 37.8;

  ngOnInit(): void {
    this.onGetInitialRectangleData();
  }

  // Gets the initial data of rectangle svg from server
  onGetInitialRectangleData() {
    this.rectangleService.getInitialRectangleData().subscribe({
      next: (result: RectangleData) => {
        this.rectangle = result;
      },
      error: (err: any) => {
        this.toastService.showToast(err.messsage, 'error');
      },
    });
  }

  // Updates-resets the data of rectangle svg
  onResetRectangleData() {
    this.rectangleService.updateRectangleData(this.rectangle).subscribe({
      next: () => {
        this.toastService.showToast('Updated successfully!', 'success');
      },
      error: (err: any) => {
        this.toastService.showToast(err.messsage, 'error');
      },
    });
  }

  /**
   * Sets up initial values for dragging based on the mouse position and the current
   * rectangle position during mousedown event.
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
   * Updates the position of the rectangle based on the mouse movement.
   * @param event The MouseEvent representing the mouse move event.
   */
  handleDragResize(event: MouseEvent): void {
    if (this.isDragging && !this.isResizing) {
      this.rectangle.x = event.clientX - this.startX;
      this.rectangle.y = event.clientY - this.startY;
    }
  }

  /**
   * Handles the resizing behavior, and stores the initial dimensions and position of the rectangle
   * @param event The MouseEvent representing the mouse down event.
   */
  handleResize(event: MouseEvent): void {
    this.isResizing = true;

    this.startWidth = this.rectangle.width;
    this.startHeight = this.rectangle.height;

    this.startX = event.clientX;
    this.startY = event.clientY;

    //Prevent default behavior to avoid text selection during resize
    event.preventDefault();
  }

  /**
   * This method updates the dimensions of the rectangle based on the mouse movement
   * when resizing is in progress.
   * @param {MouseEvent} event - The MouseEvent representing the mouse move event.
   */
  handleResizeMove(event: MouseEvent): void {
    if (this.isResizing) {
      const deltaX = event.clientX - this.startX;
      const deltaY = event.clientY - this.startY;

      this.rectangle.width = Math.max(0, this.startWidth + deltaX);
      this.rectangle.height = Math.max(0, this.startHeight + deltaY);
    }
  }

  // Stop resizing or dragging when releasing the mouse button
  handleMouseUp(): void {
    this.isResizing = false;
    this.isDragging = false;
  }

  //Function to calculate perimeter of rectangle
  calculatePerimeter(): number {
    return Math.round(
      2 *
        (this.roundValueInCm(this.rectangle.width) +
          this.roundValueInCm(this.rectangle.height))
    );
  }

  //Button click on reseizing data
  onButtonClick() {
    this.showConfirmationPopUp = true;
  }

  /**
   * Handles the confirmation event triggered by pop up.
   * If the event is true, resets rectangle data; otherwise, hides the confirmation popup.
   */
  onConfirmationEvent(event: boolean) {
    if (event) {
      this.onResetRectangleData();
    }
    this.showConfirmationPopUp = false;
  }

  /**
   * Rounds a given value from pixels to centimeters based on the configured pixels per centimeter ratio.
   * @param {number} value - The value in pixels to be converted to centimeters.
   * @returns {number} The rounded value in centimeters.
   */
  roundValueInCm(value: number): number {
    return Math.round(value / this.pixelsPerCm);
  }
}
