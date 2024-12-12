import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent {

  @Input() length: number = 0;
  @Input() pageSize: number = 0;
  @Input() pageIndex: number = 1;
  @Input() pageSizeOptions = [5, 10];
  @Output() _pageEvent: EventEmitter<any> = new EventEmitter()
  pageEvent?: PageEvent;


  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this._pageEvent.emit({ page: this.pageIndex + 1, limit: this.pageSize})
  }
}
