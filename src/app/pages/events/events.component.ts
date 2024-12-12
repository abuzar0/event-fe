import { Component, inject, OnInit } from '@angular/core';
import { CardListComponent } from '../ui-components/card-list/card-list.component';
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from '../ui-components/user-form-dialog/user-form-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { EventFormDialogComponent } from '../ui-components/event-form-dialog/event-form-dialog.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { EventService } from 'src/app/services/event/event.service';
import { PaginatorComponent } from "../ui-components/paginator/paginator.component";

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CardListComponent, MatButtonModule, CommonModule, PaginatorComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  page: number = 1;
  limit: number = 5;
  total: number = 0;
  totalPages: number = 1;
  events: any[] = []
  constructor(public _authService: AuthService, private _eventService: EventService) { }
  ngOnInit(): void {
    this.getEvents();
  }


  openEventForm() {
    const dialogRef = this.dialog.open(EventFormDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getEvents();
    });
  }

  getEvents(): void {
    this._eventService.getEventsList({ limit: this.limit, page: this.page })
      .subscribe((res: any) => {
        console.log("res", res)
        this.events = res.data;
        this.page = res.pagination.page;
        this.totalPages = res.pagination.totalPages;
        this.total = res.pagination.total;
      })
  }

  handlePage({ page, limit }: { page: number, limit: number }): void {
    this.page = page;
    this.limit = limit;
    this.getEvents()
  }

  joinEvent(eventId: string) {
    this._eventService.joinEvent({ eventId })
      .subscribe((res) => {
        console.log("res join", res);
        this.getEvents();
      })
  }

  approvedEvent(eventId: string) {
    this._eventService.approvedEvent(eventId, { isApprove: true })
      .subscribe((res) => {
        console.log("res approved", res);
        this.getEvents();
      })
  }

  deleteEvent(eventId: string) {
    this._eventService.deleteEvent(eventId)
      .subscribe((res) => {
        console.log("res delete", res);
        this.getEvents();
      })
  }

}
