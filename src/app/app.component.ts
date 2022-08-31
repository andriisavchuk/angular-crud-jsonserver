import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isUserLoggedIn!: boolean;

  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit() {
    this.loginService.isUserLoggedIn$.subscribe((res) => {
      this.isUserLoggedIn = res;
    });
  }

  goToLoginPage() {
    this.router.navigate(['login']);
  }

  goToSubmitPage() {
    this.router.navigate(['signup']);
  }

  logout() {
    this.loginService.isUserLoggedIn.next(false);
    this.router.navigate(['login']);
    localStorage.clear();
  }
}
