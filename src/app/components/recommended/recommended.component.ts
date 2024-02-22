import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recommended',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.css'
})
export class RecommendedComponent {
 
 

constructor(private router: Router, auth: AuthService) { 
  auth.loggedIn.subscribe((value) => {
    this.isLogged = value;
  })
}

  trueDetective : boolean = true
  houseOfTheDragon : boolean = false
  theSopranos : boolean = false
  rickAndMorty : boolean = false
  isHovering: boolean = false;
  autoInterval: any;
  isLogged: boolean = false;

  setTrueDetective() {
    this.trueDetective = true
    this.houseOfTheDragon = false
    this.theSopranos = false
    this.rickAndMorty = false
  }
  setHouseOfTheDragon() {
    this.houseOfTheDragon = true
    this.trueDetective = false
    this.theSopranos = false
    this.rickAndMorty = false
  }
  setTheSopranos() {
    this.houseOfTheDragon = false
    this.trueDetective = false
    this.theSopranos = true
    this.rickAndMorty = false
  }
  setRickAndMorty() {
    this.rickAndMorty = true
    this.houseOfTheDragon = false
    this.trueDetective = false
    this.theSopranos = false
  }

  currentSlide(index: number) {
    
    this.trueDetective = index === 1;
    this.houseOfTheDragon = index === 2;
    this.theSopranos = index === 3;
    this.rickAndMorty = index === 4;
  }
  nextRecomm(){
    if (this.trueDetective) {
      this.trueDetective = false;
      this.houseOfTheDragon = true;
    } else if (this.houseOfTheDragon) {
      this.houseOfTheDragon = false;
      this.theSopranos = true;
    } else if (this.theSopranos) {
      this.theSopranos = false;
      this.rickAndMorty = true;
    } else if (this.rickAndMorty) {
      this.rickAndMorty = false;
      this.trueDetective = true;
    }
  }
  previousRecomm(){
    if (this.trueDetective) {
      this.trueDetective = false;
      this.rickAndMorty = true;
    } else if (this.houseOfTheDragon) {
      this.houseOfTheDragon = false;
      this.trueDetective = true;
    } else if (this.theSopranos) {
      this.theSopranos = false;
      this.houseOfTheDragon = true;
    } else if (this.rickAndMorty) {
      this.rickAndMorty = false;
      this.theSopranos = true;
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
