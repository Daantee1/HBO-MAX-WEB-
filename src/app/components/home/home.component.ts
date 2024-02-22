import { Component, Input } from '@angular/core';
import { RecommendedComponent } from "../recommended/recommended.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { OutstandingMoviesComponent } from "../outstanding-movies/outstanding-movies.component";
import { LastAddedComponent } from "../last-added/last-added.component";
import { AlertMovieComponent } from "../alert-movie/alert-movie.component";
import { EscapeToAntotherWorldMovieComponent } from "../escape-to-antother-world-movie/escape-to-antother-world-movie.component";
import { CommonModule } from '@angular/common';
import { VisualService } from '../../services/visual.service';
import { FooterComponent } from "../footer/footer.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [RecommendedComponent, NavbarComponent, OutstandingMoviesComponent, LastAddedComponent, AlertMovieComponent, EscapeToAntotherWorldMovieComponent, CommonModule, FooterComponent]
})
export class HomeComponent {

    isBlur = false;
    
    constructor(private visualService: VisualService) { 
        visualService.isBlur.subscribe((value) => {
            this.isBlur = value;
        })
    }

}
