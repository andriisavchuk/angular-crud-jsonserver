import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public isUserLoggedIn = new BehaviorSubject<boolean>(false);
  public isUserLoggedIn$ = this.isUserLoggedIn.asObservable();

  constructor() {}
}
