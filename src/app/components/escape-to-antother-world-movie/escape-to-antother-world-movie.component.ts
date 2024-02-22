import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-escape-to-antother-world-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './escape-to-antother-world-movie.component.html',
  styleUrl: './escape-to-antother-world-movie.component.css'
})
export class EscapeToAntotherWorldMovieComponent {
  currentPosition = 0;
  slideDirection: string = '';
  isHovering: boolean = false;
  isLeftArrowVisible = false;
  escapeToAntoherWorldMovies: any[] = [];
  isLogged: boolean = false;

  constructor(private http: HttpClient, private router: Router, auth: AuthService) {
    this.http.get<any[]>('assets/dataBase/escapeToAntoherWorldMovies.json').subscribe((data) => {
      this.escapeToAntoherWorldMovies = data;
     
    },
    error => {
      console.log('An error occurred while fetching movies:', error);
    })
    auth.loggedIn.subscribe((value) => {
      this.isLogged = value;
    })
   }

  next(){
    const totalMovies = this.escapeToAntoherWorldMovies.length;
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
