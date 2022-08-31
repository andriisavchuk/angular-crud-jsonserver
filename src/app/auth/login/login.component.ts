import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CryptojsService } from '../../services/cryptojs.service';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private cryptojs: CryptojsService,
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginForm = this.formBuilder.group({
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      this.api.getUsers().subscribe((res) => {
        const validatedUser = res.find((user: any) => {
          let decryptedPassword = this.cryptojs.decryptValue(
            '123456$#@$^@1ERF',
            user.userPassword
          );
          return (
            user.userEmail === this.loginForm.value.userEmail &&
            decryptedPassword === this.loginForm.value.userPassword
          );
        });

        if (validatedUser) {
          localStorage.setItem(
            'token',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNsaW50IEVhc3R3b29kIiwiaWF0IjoxNTE2MjM5MDIyfQ.7RePjIHZLSLq8m6xnY6eQEMFHcMvYXiWRFeQWG4IpAU'
          );
          localStorage.setItem('userType', 'admin');
          this.loginService.isUserLoggedIn.next(true);
          this.router.navigate(['dashboard']);
          this.snackBar.open('You are successfully logged in');
        } else {
          this.snackBar.open(
            'User is not found. Please check your credentials'
          );
        }
      });
    }
  }
}
