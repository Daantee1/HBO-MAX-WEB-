import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { json } from 'stream/consumers';
import { OutstandingMoviesComponent } from "../outstanding-movies/outstanding-movies.component";
import { EscapeToAntotherWorldMovieComponent } from "../escape-to-antother-world-movie/escape-to-antother-world-movie.component";
import { LastAddedComponent } from "../last-added/last-added.component";


@Component({
    selector: 'app-movie-detail',
    standalone: true,
    templateUrl: './movie-detail.component.html',
    styleUrl: './movie-detail.component.css',
    imports: [HttpClientModule, CommonModule, OutstandingMoviesComponent, EscapeToAntotherWorldMovieComponent, LastAddedComponent]
})
export class MovieDetailComponent implements OnInit{
  currentPosition = 0;
  movieId: number = 0;
  movies: any[] = [];
  movie: any
  slideDirection: string = '';
  isHovering: boolean = false;
  isLeftArrowVisible = false;
  outstandingMovies: boolean = false;
  escapeToAntoherWorldMovies : boolean = false;
  lastAddedMovies: boolean = false;
  recommendedMovies: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient,private router: Router) { 
    this.route.params.subscribe((params: any) => {
      this.movieId = +params['id'];
    })
    
    
  }
  ngOnInit(): void {
    this.fetchMovie()
  }

  fetchMovie(){
    let jsonFileName: string;
    if(this.movieId <= 11){
      jsonFileName = 'outstandingMovies.json';
      this.outstandingMovies = true;
    } else if(this.movieId >= 12 && this.movieId <= 19){
      jsonFileName = 'escapeToAntoherWorldMovies.json';
      this.escapeToAntoherWorldMovies = true;
      
    }else if(this.movieId >= 30){
      jsonFileName = 'recommendedMovies.json';
      this.recommendedMovies = true;
    }
     else {
      jsonFileName = 'lastAddedMovies.json';
      this.lastAddedMovies = true;
    }

    this.http.get<any[]>(`/assets/dataBase/${jsonFileName}`).subscribe((data) => {
      this.movies = data
      this.movie = this.movies.find(m => m.id === this.movieId);
      
    },
    error => {
      console.log('An error occurred while fetching movie:', error);
    })
  }

  next(){
    const totalMovies = this.movies.length;
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
    this.router.navigate(['/details', id]);
  }
  
  
}
