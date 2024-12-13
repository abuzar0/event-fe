import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IAction } from 'src/app/utils/types/IAction';


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

  getDisabledState(action: IAction, event: any): boolean {
    return typeof action.disable === 'function' ? action.disable(event) : action.disable;
  }

}

