import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogModule } from '@angular/material/dialog';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-event-form-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, ReactiveFormsModule,CommonModule],
  templateUrl: './event-form-dialog.component.html',
  styleUrl: './event-form-dialog.component.scss'
})
export class EventFormDialogComponent {
  eventForm!: FormGroup;
  todayDate: string = '';

  constructor(private fb: FormBuilder,private _eventService:EventService,private _modelRef:MatDialog) { }

  ngOnInit(): void {
    this.eventForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      date: ['', Validators.required]
    });

    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
  }


  onSubmit(): void {
    if (this.eventForm.valid) {
      this._eventService.createEvent(this.eventForm.value)
      .subscribe((res)=>{
        console.log("res",res);
        this._modelRef.closeAll()
      })
    }
  }
}
