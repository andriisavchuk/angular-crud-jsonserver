import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      userEmail: ['', Validators.required, Validators.email],
      userPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login(){
    console.log('login user')
  }
}
