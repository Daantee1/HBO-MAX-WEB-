import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-outstanding-movies',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './outstanding-movies.component.html',
  styleUrl: './outstanding-movies.component.css'
})
export class OutstandingMoviesComponent {

  constructor(private router: Router, private http: HttpClient, auth: AuthService) { 
    this.http.get<any[]>('assets/dataBase/outstandingMovies.json').subscribe((data) => {
      this.moviesOutstanding = data;
      
    },
    error => {
      console.log('An error occurred while fetching movies:', error);
    })
    auth.loggedIn.subscribe((value) => {
      this.isLogged = value;
    })
  }

  currentPosition = 0;
  slideDirection: string = '';
  isHovering: boolean = false;
  isLeftArrowVisible = false;
  moviesOutstanding: any[] = [];
  isLogged: boolean = false;

  next(){
    const totalMovies = this.moviesOutstanding.length;
    if(this.currentPosition < totalMovies - 6){
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
  


