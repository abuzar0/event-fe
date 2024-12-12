import { Component, inject, OnInit } from '@angular/core';
import { CardListComponent } from '../ui-components/card-list/card-list.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EventFormDialogComponent } from '../ui-components/event-form-dialog/event-form-dialog.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { EventService } from 'src/app/services/event/event.service';
import { PaginatorComponent } from "../ui-components/paginator/paginator.component";
import { InputSearchComponent } from "../ui-components/input-search/input-search.component";
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { IEvent } from 'src/app/utils/types/IEvent';

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [CardListComponent, MatButtonModule, MatIconModule, CommonModule, PaginatorComponent, InputSearchComponent],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  page: number = 1;
  limit: number = 5;
  total: number = 0;
  totalPages: number = 1;
  events: IEvent[] = []
  events$?: Observable<any>;
  searchSubject: Subject<string> = new Subject<string>();
  search: string = ''

  constructor(public _authService: AuthService,
    private _eventService: EventService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe((params) => {
      const searchTerm = params['search'] || ''
      if (this.search !== searchTerm) {
        this.search = searchTerm;
        this.searchSubject.next(this.search);
      }
      this.page = +params['page'] || 1;
      this.limit = +params['limit'] || 5;
      this.getEvents();
    });
    this.setupSearchDebounce();
  }

  private setupSearchDebounce(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe((term: string) => {
      this.search = term;
      this.updateQueryParams(this.search);
    });
  }


  openEventForm() {
    const dialogRef = this.dialog.open(EventFormDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getEvents();
    });
  }

  getEvents(): void {
    this._eventService.getEventsList({ limit: this.limit, page: this.page }, this.search)
      .subscribe((res: any) => {
        this.events = res.data;
        this.page = res.pagination.page;
        this.totalPages = res.pagination.totalPages;
        this.total = res.pagination.total;
      })
  }

  handlePage({ page, limit }: { page: number, limit: number }): void {
    this.page = page;
    this.limit = limit;
    this.updateQueryParams(this.search);
    this.getEvents()
  }

  searchByQuery(query: string): void {
    this.searchSubject.next(query);
  }

  joinEvent(eventId: string) {
    this._eventService.joinEvent({ _id:eventId })
      .subscribe((res) => {
        this.getEvents();
      })
  }

  approvedEvent(eventId: string) {
    this._eventService.approvedEvent(eventId, { isApprove: true })
      .subscribe((res) => {
        this.getEvents();
      })
  }

  deleteEvent(eventId: string) {
    this._eventService.deleteEvent(eventId)
      .subscribe((res) => {
        this.getEvents();
      })
  }


  updateQueryParams(search: string): void {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        search,
        page: this.page,
        limit: this.limit
      },
      queryParamsHandling: 'merge'
    });
  }

}
