import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-toast-dialog',
  standalone: true,
  imports: [MatButtonModule,MatIconModule, MatDialogActions, MatDialogClose, CommonModule, MatDialogContent],
  templateUrl: './toast-dialog.component.html',
  styleUrl: './toast-dialog.component.scss'
})
export class ToastDialogComponent {
  data = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ToastDialogComponent>);

  closeDialog() {
    this.dialogRef.close('yes');
  }
}
