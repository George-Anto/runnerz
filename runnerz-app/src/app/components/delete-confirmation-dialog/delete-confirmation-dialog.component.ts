import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-delete-confirmation-dialog',
  standalone: true,
  imports: [MatIconModule, MatDialogModule, MatButton],
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrl: './delete-confirmation-dialog.component.scss',
})
export class DeleteConfirmationDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
