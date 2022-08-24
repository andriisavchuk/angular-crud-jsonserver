import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit() {}

  goToLoginPage() {
    console.log('login button');
  }

  goToSubmitPage() {
    console.log('signup button');
  }
}
