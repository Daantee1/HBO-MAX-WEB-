import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {  Component, DoCheck } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { FooterComponent } from "../footer/footer.component";
import { OutstandingMoviesComponent } from "../outstanding-movies/outstanding-movies.component";
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-search',
    standalone: true,
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
    imports: [CommonModule, FormsModule, FooterComponent, OutstandingMoviesComponent]
})
export class SearchComponent implements DoCheck {
  inputValue: string = '';
  isXVisible: boolean = false;
  allMovies: any[] = [];
  matchedMovies: any[] = [];
  isLogged: boolean = false;

  constructor(private http: HttpClient, private router : Router, auth: AuthService) {
    forkJoin([
      this.http.get<any[]>('assets/dataBase/escapeToAntoherWorldMovies.json'),
      this.http.get<any[]>('assets/dataBase/outstandingMovies.json'),
      this.http.get<any[]>('assets/dataBase/lastAddedMovies.json'),
      this.http.get<any[]>('assets/dataBase/recommendedMovies.json')
    ]).subscribe(([data1, data2, data3, data4]) => {
      this.allMovies = [...data1, ...data2, ...data3, ...data4];
     
     
    });
    auth.loggedIn.subscribe((value) => {
      this.isLogged = value;
    })
  }
  ngDoCheck(): void {
    this.isXVisible = this.inputValue ? true : false;
    this.search();
    
  }
  deleteValueInInput() {
    this.inputValue = '';
  }
  search() {
    if(this.inputValue){
      this.matchedMovies = this.allMovies.filter((movie)=> movie.title.toLowerCase().includes(this.inputValue.toLowerCase()))
    } else{
      this.matchedMovies = [];
     
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
