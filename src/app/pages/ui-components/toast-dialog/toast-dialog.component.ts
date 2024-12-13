import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-toast-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './toast-dialog.component.html',
  styleUrl: './toast-dialog.component.scss'
})
export class ToastDialogComponent {
  data = inject(MAT_DIALOG_DATA);
}
