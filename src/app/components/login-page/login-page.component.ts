import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user';
import { FormsModule } from '@angular/forms';
import { BlobOptions } from 'node:buffer';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  @ViewChild('showPassword') showPasswordIcon!: ElementRef;
  @ViewChild('hidePassword') hidePasswordIcon!: ElementRef;
  @ViewChild('password') password!: ElementRef;

  showPassword: boolean = false;
  hidePassword: boolean = true;
  wrongPasswordOrEmail: boolean = true;

  

  usersList : User[] = []

  user = {
    email: '',
    password: ''
  
  }

  

  constructor(private userService: UserService, private router: Router, private auth: AuthService){
    userService.usersListObs.subscribe(data => {
      this.usersList = data;
      console.log(this.usersList, 'lista')
    })

  }

  login(){
    if(this.userService.checkUser(this.user.email, this.user.password)){
      console.log('logged in')
      this.auth.loggedIn.next(true)
      this.router.navigate(['/profile-select'])
      
    }else{
      console.log('not logged in')
      this.wrongPasswordOrEmail = false;
    }
  }

  showPasswordIconFunc(){
    this.showPasswordIcon.nativeElement.classList.remove('hidden');
    this.hidePasswordIcon.nativeElement.classList.remove('hidden');
    this.password.nativeElement.type = 'password';
  }
  hidePasswordIconFunc(){
    this.showPasswordIcon.nativeElement.classList.remove('hidden');
    this.hidePasswordIcon.nativeElement.classList.add('hidden');
    
    this.password.nativeElement.type = 'text';
  }
  
}
