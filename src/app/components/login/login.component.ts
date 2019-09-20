import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Role, LoginMode } from 'src/app/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailFormControl: FormControl;
  passwordFormControl: FormControl;
  nameFormControl: FormControl;
  showPasswordBlock = false;
  viewMode: LoginMode;
  loginMode = LoginMode;

  constructor(
    private router: Router,
    private api: ApiService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.viewMode = LoginMode.EMAIL;
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]);
    this.nameFormControl = new FormControl('', [Validators.required]);
  }

  emailSubmit() {
    if (this.emailFormControl.status === 'VALID') {
      if (this.api.validateEmail(this.emailFormControl.value)) {
        this.viewMode = this.loginMode.PASSWORD;
      } else {
        this.viewMode = this.loginMode.NAME;
      }
    }
  }

  nameSubmit() {
    if (this.nameFormControl.status === 'VALID') {
      this.auth.setRole(Role.USER);
      this.auth.setName(this.nameFormControl.value);
      this.router.navigate(['/languages']);
    }
  }

  passwordSubmit() {
    if (this.passwordFormControl.status === 'VALID') {
      this.api.validatePwd(this.passwordFormControl.value)
      .then((res) => {
        this.passwordFormControl.setErrors({ invalid: !res });
        if (res) {
          this.auth.setRole(Role.ADMIN);
          this.router.navigate(['/dashboard']);
        }
      });
    }
  }
}
