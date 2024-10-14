import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userName = JSON.parse(sessionStorage.getItem("user")!).name;
  userProfile = JSON.parse(sessionStorage.getItem("user")!).picture;
  
  constructor(private authService: AuthService) { }

  signOut(){
    sessionStorage.removeItem("user");
    this.authService.signOut();
  }

}
