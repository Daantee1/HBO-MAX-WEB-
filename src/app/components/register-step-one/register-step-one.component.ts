import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-register-step-one',
    standalone: true,
    templateUrl: './register-step-one.component.html',
    styleUrl: './register-step-one.component.css',
    imports: [CommonModule, FooterComponent, RouterModule]
})
export class RegisterStepOneComponent {

  constructor(private userService: UserService) { 

  }

  

  chooseMonthPlan(){
    this.userService.monthPlan.next(true);
    this.userService.yearPlan.next(false);
  }
  chooseYearPlan(){
    this.userService.yearPlan.next(true);
    this.userService.monthPlan.next(false);
  }

}
