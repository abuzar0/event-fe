import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RoleService } from 'src/app/services/role/role.service';
import { IRole } from 'src/app/utils/types/IRole';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { RoleTableComponent } from "../ui-components/role-table/role-table.component";
import { MatDialog } from '@angular/material/dialog';
import { RoleFormComponent } from '../ui-components/role-form/role-form.component';
import { IAction } from 'src/app/utils/types/IAction';

@Component({
  selector: 'app-role-premission',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatButtonModule, RoleTableComponent],
  templateUrl: './role-premission.component.html',
  styleUrl: './role-premission.component.scss'
})
export class RolePremissionComponent {



  roles: IRole[] = []
  displayedColumns = ['type', 'permissions','action'];
  actions: IAction[] = []

  constructor(private _roles: RoleService, public _authService: AuthService, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.getRoles();
    this.actions = [
      { color: 'primary', title: 'Modify', icon: 'edit', Method: (args: any) => { this.updateRole(args) }, disable: false },
    ]
  }

  getRoles(): void {
    this._roles.getRoles()
      .subscribe((res: any) => {
        this.roles = res.data;
      })
  }

  openRoleForm(): void {
    const dialogRef = this.dialog.open(RoleFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.getRoles();
    });
  }

  updateRole(args: any): void {
    const dialogRef = this.dialog.open(RoleFormComponent,
      {
        data:args
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.getRoles();
    });
  }

}
