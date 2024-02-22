import { Component, HostListener, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualService } from '../../services/visual.service';
import { Router, RouterModule } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

 menuOpen: boolean = false;
 menuOpenSecond: boolean = false;
 menuOpenProfile: boolean = false;
 isScrolled: boolean = false;
 isBlur: boolean = false;
 isLoggedIn: boolean = false;
 profileName: any = '';

 constructor(private visualService: VisualService, private router: Router, private profileService: ProfileService, private auth: AuthService) { 
  visualService.isBlur.subscribe((value) => {
    this.isBlur = value;

  })
  profileService.getCurrentProfileToHomePageObs().subscribe((profile) => {
    this.profileName = profile
  })
  auth.loggedIn.subscribe((value) => {
    this.isLoggedIn = value;
  })
 }

 toggleMenu() {
  this.menuOpen = !this.menuOpen;
  this.visualService.isBlur.next(this.menuOpen);
  console.log('menuOpen', this.menuOpen);
}
  toggleMenuSecond(){
    this.menuOpenSecond = !this.menuOpenSecond;
}

toggleMenuProfile(){
  this.menuOpenProfile = !this.menuOpenProfile;
}
logout(){
  this.auth.loggedIn.next(false);
  
}

nv(){
  console.log('nv');
}




  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 0;
  }
}
