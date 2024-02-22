import { Component } from '@angular/core';
import { VisualService } from '../../../services/visual.service';
import { ProfileService } from '../../../services/profile.service';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { Profile } from '../../../types/profile';
import { profile } from 'console';


@Component({
  selector: 'app-profile-add',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './profile-add.component.html',
  styleUrl: './profile-add.component.css'
})
export class ProfileAddComponent {

  
    profileName: any = '' ;
    currentProfile: any = '';
    currentProfileActive: boolean = false;

    constructor(private visualService: VisualService, private profileService: ProfileService, private router : Router) {
      visualService.showNavbar.next(false);
      profileService.currentProfileObs.subscribe((profile) => {
        this.currentProfile = profile;
        
        
      })
      profileService.currentProfileBoolean.subscribe((profile) => {
        this.currentProfileActive = profile;
      });
    }

   addProfile(){
      const newProfile: Profile = {
        name: this.profileName
      }
      this.profileService.addProfile(newProfile)
      this.router.navigate(['/profile-select'])
   }
   changeProfile(){
    this.profileService.changeCurrentProfile(this.currentProfile)
    this.router.navigate(['/profile-select'])
    this.profileService.currentProfileBoolean.next(false);
   }

   deleteProfile(){
    this.profileService.deleteProfile(this.currentProfile)
    this.router.navigate(['/profile-select'])
    this.profileService.currentProfileBoolean.next(false);
   }
}
