import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth/auth.service';

type Action = {
  color: string;
  title: string;
  icon: string;
  Method: (args: any) => void;
  disable: boolean | ((event: any) => boolean); // Allow both boolean and function
};


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  // actions of the table
  @Input() actions: any;
  // table column names from main components
  @Input() displayedColumns: any;

  // table colum data from main components
  @Input() dataSource: any;

  @ViewChild(MatSort) sort!: MatSort;
  constructor(public _authService: AuthService) { }

  getDisabledState(action: Action, event: any): boolean {
    return typeof action.disable === 'function' ? action.disable(event) : action.disable;
  }

}

