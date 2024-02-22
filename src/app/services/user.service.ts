import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  monthPlan = new BehaviorSubject<boolean>(false)
  yearPlan = new BehaviorSubject<boolean>(false)
  usersList : User[] = []
  usersListObs= new BehaviorSubject<User[]>(this.usersList)

  
  

  constructor() { }

  registerUser(user: User){
    this.usersList.push(user)
    this.usersListObs.next(this.usersList)
  }

  checkEmailIsTaken(email: string){
    let user = this.usersList.find(user=> user.email === email)
    if(user){
      return true
    } else {
      return false
    }
  }

  checkUser(email: string, password: string){
    let user = this.usersList.find(user=> user.email === email && user.password === password)
    if(user){
      return true
    } else {
      return false
    }
  }
}
