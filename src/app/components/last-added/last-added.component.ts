import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-last-added',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './last-added.component.html',
  styleUrl: './last-added.component.css'
})
export class LastAddedComponent {
  currentPosition = 0;
  slideDirection: string = '';
  isHovering: boolean = false;
  isLeftArrowVisible = false;
  lastAddedMovies: any[] = [];
  isLogged: boolean = false;

  constructor(private router: Router, private http: HttpClient, auth: AuthService) {
    this.http.get<any[]>('assets/dataBase/lastAddedMovies.json').subscribe((data) => {
      this.lastAddedMovies = data;
    },
    error => {
      console.log('An error occurred while fetching movies:', error);
    })
    auth.loggedIn.subscribe((value) => {
      this.isLogged = value;
    })
  }

  next(){
    const totalMovies = this.lastAddedMovies.length;
    if(this.currentPosition < totalMovies - 4){
      this.currentPosition++;
      this.slideDirection = 'right';
      this.isLeftArrowVisible = true;
  }
}
  previous(){
    if (this.currentPosition > 0) { 
      this.currentPosition--;
      this.slideDirection = 'left';
    }
    if(this.currentPosition === 0){
      this.isLeftArrowVisible = false;
    }
  }

  navigateToDetails(id: number){
    if(this.isLogged){
      this.router.navigate(['/details', id]);
    }else{
      this.router.navigate(['/register-or-login']);
    }
  }
}
