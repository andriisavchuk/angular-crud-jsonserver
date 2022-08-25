import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userEmail: ['', Validators.required, Validators.email],
      userPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  signup() {
    console.log('signup user');
  }
}
