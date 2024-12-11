import { Component, inject } from '@angular/core';
import { TableComponent } from "../ui-components/table/table.component";
import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from '../ui-components/user-form-dialog/user-form-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [TableComponent,MatButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {


  readonly dialog = inject(MatDialog);

  constructor(private _userService:UserService){}

  openUserForm() {
    const dialogRef = this.dialog.open(UserFormDialogComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  getUsersList(){
    this._userService
  }

}
