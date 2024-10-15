import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css',
})
export class ConfirmationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>, // Specify the type
    @Inject(MAT_DIALOG_DATA) public data: { id: number } // Inject the data with proper type
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Emit confirmation
  }

  onCancel(): void {
    this.dialogRef.close(false); // Emit cancellation
  }
}
