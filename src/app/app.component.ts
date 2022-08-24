import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {}

  loginUser() {
    console.log('login button');
  }

  signupUser() {
    console.log('login button');
  }
}
