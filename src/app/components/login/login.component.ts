import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Role, LoginMode } from 'src/app/models';
import { DEFAULT_ADMIN_ROUTE, DEFAULT_USER_ROUTE } from 'src/app/Utility';

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
      this.auth.setEmail(this.emailFormControl.value);
      this.api.validateEmail(this.emailFormControl.value)
        .then(userName => {
          if (userName) {
            this.auth.setName(userName);
            this.viewMode = this.loginMode.PASSWORD;
          } else {
            this.viewMode = this.loginMode.NAME;
          }
        })
        .catch(error => console.log(error));
    }
  }

  nameSubmit() {
    if (this.nameFormControl.status === 'VALID') {
      this.auth.setRole(Role.USER);
      this.auth.setName(this.nameFormControl.value);
      this.router.navigate([`${DEFAULT_USER_ROUTE}languages`]);
    }
  }

  passwordSubmit() {
    if (this.passwordFormControl.status === 'VALID') {
      this.api.validatePwd(this.auth.getEmail(), this.passwordFormControl.value)
      .then((res) => {
        this.passwordFormControl.setErrors({ invalid: !res });
        if (res) {
          this.auth.setRole(Role.ADMIN);
          this.auth.authenticate();
          this.router.navigate([`${DEFAULT_ADMIN_ROUTE}dashboard`]);
        }
      }).catch(error => console.log(error));
    }
  }
}
