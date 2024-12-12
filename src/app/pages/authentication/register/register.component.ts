import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RoleService } from 'src/app/services/role/role.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  form!:FormGroup
  role:any[]=[];


  constructor(private router: Router,private _roleService: RoleService,private _authService:AuthService) {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9_]+$/) // Username regex validation
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email // Email validation
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8) // Password length validation
      ]),
      role: new FormControl('', [
        Validators.required // Role is required
      ])
    });

    this._roleService.getRoles()
    .subscribe((res:any)=>{
      console.log(res);
      this.role=res.data;
    },
  )
  }



  get f() {
    return this.form.controls;
  }

  onSubmit() {
    // console.log(this.form.value);
    if(this.form.valid){
      const body = { ...this.form.value }
      this._authService
        .registerUser(body)
        .subscribe((res: any) => {
          console.log(res);
          this.router.navigate(['/authentication/login']);
        });
    }
  }
}
