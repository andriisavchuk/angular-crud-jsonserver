import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CryptojsService } from '../../services/cryptojs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private snackBar: MatSnackBar,
    private cryptojs: CryptojsService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  signup() {
    if (this.signUpForm.valid) {
      const user = this.signUpForm.value;
      user.userPassword = this.cryptojs.encryptValue(
        '123456$#@$^@1ERF',
        user.userPassword
      );

      this.api.signupUser(user).subscribe({
        next: () => {
          this.snackBar.open('You are successfully signed up');
          this.router.navigate(['login']);
        },
        error: () => {
          this.snackBar.open('Error during sign up process', '', {});
        },
      });
    }
  }
}
