import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  standalone: true,
  imports: [MaterialModule, CommonModule]
})
export class CardListComponent {
  @Input() event: any;

  @Output() joinEvent: EventEmitter<string> = new EventEmitter();
  @Output() approvedEvent: EventEmitter<string> = new EventEmitter();
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter();
  constructor(public _authService: AuthService) { }

}
