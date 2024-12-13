import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { RoleService } from 'src/app/services/role/role.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'app-user-form-dialog',
  standalone: true,
  imports: [MatDialogModule,MatFormFieldModule, MatButtonModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './user-form-dialog.component.html',
  styleUrl: './user-form-dialog.component.scss'
})
export class UserFormDialogComponent {
  form!: FormGroup;
  matcher = new MyErrorStateMatcher();
  role:any[]=[];
  constructor(
    private _authService: UserService,
    private _roleService:RoleService,
    private _dialogRef:MatDialog
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_]+$/)
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8)
      ]),
      role: new FormControl('', [
        Validators.required
      ])
    });

    this._roleService.getRoles()
    .subscribe((res:any)=>{
      this.role=res.data;
    },
  )
  }

  createUser() {
    if (
      this.form.controls['email'].value != '' &&
      this.form.controls['password'].value != ''&&
      this.form.controls['username'].value != ''&&
      this.form.controls['role'].value != ''
    ) {
      const body = { ...this.form.value }
      this._authService
        .registerUser(body)
        .subscribe((res: any) => {
          this._dialogRef.closeAll();
        });
    }
  }
}
