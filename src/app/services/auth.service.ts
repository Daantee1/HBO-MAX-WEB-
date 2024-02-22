import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = new BehaviorSubject<boolean>(false)

  constructor() { }
}
