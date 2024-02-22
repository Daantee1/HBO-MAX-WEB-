import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";

import { User } from '../../types/user';
import { FormsModule } from '@angular/forms';



@Component({
    selector: 'app-register-step-two',
    standalone: true,
    templateUrl: './register-step-two.component.html',
    styleUrl: './register-step-two.component.css',
    imports: [CommonModule, RouterModule, FooterComponent, FormsModule]
})
export class RegisterStepTwoComponent {


  user: User = {
    id: null,
    email: '',
    emailConfirm: '',
    name: '',
    lastName: '',
    password: '',
    subscription: ''
  }

  yearPlan : boolean = false;
  monthPlan : boolean = false;
  noEmailValid: boolean = false;
  emailIsTaken: boolean = false;

  constructor(private userService: UserService, private router: Router) { 
    userService.monthPlan.subscribe((value) => {
      this.monthPlan = value;
      console.log('monthPlan', this.monthPlan);
     
    })
    userService.yearPlan.subscribe((value) => {
      this.yearPlan = value;
      console.log('year', this.yearPlan);
    })
  }

  setSubscriptionPlan(){
    if(this.monthPlan === true){
      this.user.subscription = '29.99';
    }
    if(this.yearPlan === true){
      this.user.subscription = '234.99';
    }
  }

  isEmailValid() {
    if(this.user.email === this.user.emailConfirm) {
      this.noEmailValid = true;
    }
    else{
      this.noEmailValid = false;
    }
  }
  register(){
    if(this.userService.checkEmailIsTaken(this.user.email)){
      console.log('email is taken')
      this.emailIsTaken = true;
    }else{
      if(this.noEmailValid === true){
        this.setSubscriptionPlan()
        this.userService.registerUser(this.user);
        this.router.navigate(['/login-page']);
      }
    }

  
}
}
