import { Component, ViewChild } from '@angular/core';
import { VisualService } from '../../services/visual.service';
import { ProfileService } from '../../services/profile.service';
import { Router, RouterModule } from '@angular/router';
import { Profile } from '../../types/profile';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile-select',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './profile-select.component.html',
  styleUrl: './profile-select.component.css'
})
export class ProfileSelectComponent {
 @ViewChild('button') button: any;

  profiles: Profile[]= [];
  isLimitReached: boolean = false;
  isLimitReachedAlert: boolean = false;
  profileCustomize: boolean = false;

  constructor(private visualService: VisualService, private profileService: ProfileService,private router : Router, private auth: AuthService) {
    visualService.showNavbar.next(false);
    this.profileService.getProfilesObs().subscribe((profiles) => {
      this.profiles = profiles;
      if(this.profiles.length >= 4){
        this.isLimitReached = true;
      }
    });

   }

   isLimitReachedFunc(){
     if(this.profiles.length >= 4){
       this.isLimitReachedAlert = true;
       this.button.nativeElement.disabled = true;
     }
   }

   profileChange(){
    this.profileCustomize = !this.profileCustomize;
   }
   routeToCustomizeProfile(profile: Profile){
    this.profileService.getCurrentProfile(profile);
    this.profileService.currentProfileBoolean.next(true);
      this.router.navigate(['/profile-select/profile-add']) 
   }

   goHome(profile: Profile){
    this.visualService.showNavbar.next(true);
    this.auth.loggedIn.next(true);
    this.router.navigate(['/home'])
    this.profileService.getCurrentProfileToHomePage(profile);
   }
}
