import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class AppSideLoginComponent {
  form!:FormGroup
  constructor(private router: Router,private _authService:AuthService) {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email // Email validation
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8) // Password length validation
      ])
    });

  }

  onSubmit() {
    if(this.form.valid){
      const body = { ...this.form.value }
      this._authService
        .loginUser(body)
        .subscribe((res: any) => {
          localStorage.setItem("userId",res.data._id);
          localStorage.setItem("userRole",res.data.role);
          this.router.navigate(['/dashboard']);
        });
    }
  }
}
