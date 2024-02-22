import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { FormsModule } from '@angular/forms';
import { VisualService } from './services/visual.service';
import { HttpClientModule } from '@angular/common/http';


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, RouterModule, FormsModule, HttpClientModule]
})
export class AppComponent {
  title = 'Hbo';
  showNavbar: boolean = true;
  constructor(private visualService: VisualService, router: Router) { 
    visualService.showNavbar.subscribe((value) => {
      this.showNavbar = value;
    })
  }

  
}
