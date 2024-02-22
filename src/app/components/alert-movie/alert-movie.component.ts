import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alert-movie',
  standalone: true,
  imports: [],
  templateUrl: './alert-movie.component.html',
  styleUrl: './alert-movie.component.css'
})
export class AlertMovieComponent {


  isLogged: boolean = false;

  constructor(private router: Router, auth: AuthService) { 
    auth.loggedIn.subscribe((value) => {
      this.isLogged = value;
    })
  }

  navigateToDetails(id: number){
    if(this.isLogged){
      this.router.navigate(['/details', id]);
    }else{
      this.router.navigate(['/register-or-login']);
    }
    
  }
}
