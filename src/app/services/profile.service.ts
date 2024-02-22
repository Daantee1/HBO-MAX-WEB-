import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from '../types/profile'; 

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  profilesList: Profile[] = [];
  profilesListObs = new BehaviorSubject<Profile[]>(this.profilesList);

  currentProfileObs = new BehaviorSubject<Profile>({name: ''}) 

  currentProfileBoolean = new BehaviorSubject<boolean>(false)

  currentProfileToHomePageObs = new BehaviorSubject<Profile>({name: ''})

  constructor() { 
    this.profilesList.push({name: 'Użytkownik'})
  }

  addProfile(profile: any) {
    this.profilesList.push(profile);
    console.log(this.profilesList);
    this.profilesListObs.next(this.profilesList);
   
  }

  changeCurrentProfile(profile: any) {
    const currentProfile = this.currentProfileObs.getValue();
    const index = this.profilesList.indexOf(currentProfile);
    if(index !== -1){
      this.profilesList.splice(index, 1, profile);
      this.profilesListObs.next(this.profilesList);
    }
  }

  getCurrentProfile(profile: any) {
    this.currentProfileObs.next(profile);
  }

  getCurrentProfileToHomePage(profile: any){
    this.currentProfileToHomePageObs.next(profile);
  }

  getCurrentProfileToHomePageObs(): Observable<Profile> {
    return this.currentProfileToHomePageObs.asObservable();
  }


  getCurrentProfilObs(): Observable<Profile[]> {
    return this.profilesListObs.asObservable();
  }

  getProfilesObs(): Observable<Profile[]> {
    return this.profilesListObs.asObservable();
  }
  deleteProfile(profile: any) {
    const index = this.profilesList.indexOf(profile);
    if(index !== -1){
      this.profilesList.splice(index, 1);
      this.profilesListObs.next(this.profilesList);
      
    }
    else{
      console.log('Nie ma takiego profilu');
    }
  }
}
