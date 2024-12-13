import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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

  dataSourceInstance!: MatTableDataSource<any>;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public _authService: AuthService) {  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataSource'] && this.dataSource) {
      this.dataSourceInstance = new MatTableDataSource(this.dataSource);
      if (this.sort) {
        this.dataSourceInstance.sort = this.sort;
      }
    }
  }

  ngAfterViewInit() {
    if (this.sort && this.dataSourceInstance) {
      this.dataSourceInstance.sort = this.sort;
    }
  }

  getDisabledState(action: IAction, event: any): boolean {
    return typeof action.disable === 'function' ? action.disable(event) : action.disable;
  }

}

