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
import { TableComponent } from "../ui-components/table/table.component";
import { ToastDialogComponent } from '../ui-components/toast-dialog/toast-dialog.component';
import { IAction } from 'src/app/utils/types/IAction';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-events',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, CommonModule, PaginatorComponent, InputSearchComponent, TableComponent],
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
  displayedColumns = ['name', 'description', 'event_date', 'isApprove', 'participants', 'action'];
  actions: IAction[] = [];

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

    if (this._authService.isAdmin()) {
      this.actions = [
        { color: 'primary', title: 'Approve', icon: 'approval', Method: (args: any) => { this.approvedEvent(args._id) }, disable: (event: any) => event.isApprove },
        { color: 'warn', title: 'Delete', icon: 'delete', Method: (args: any) => { this.deleteEvent(args) }, disable: false }
      ];
    } else {
      this.actions = [
        {
          color: 'secondary', title: 'Join', icon: 'date_range',
          Method: (args: any) => { this.joinEvent(args._id) },
          disable: (event: any) => event.participants.includes(this._authService.getUserId()) || !event.isApprove
        }
      ];
    }
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
    this._eventService.joinEvent({ _id: eventId })
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

  deleteEvent(event: IEvent) {

    if (event.isApprove) {
      const dialogRef = this.dialog.open(ToastDialogComponent, {
        data: {
          icon: 'Delete',
          iconColor:'warn',
          message: 'Do You Want to Delete ?'
        }
      })

      dialogRef.afterClosed()
        .subscribe((res) => {
          if (res == 'yes') {
            this._eventService.deleteEvent(event._id)
              .subscribe((res) => {
                this.getEvents();
              })
          }
        })
    } else {
      this.dialog.open(ToastDialogComponent, {
        data: {
          title: 'Warning',
          text: 'Please Approve the Event ?',
        }
      })
    }
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
