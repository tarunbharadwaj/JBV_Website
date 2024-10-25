import { Component, Inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main-component',
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.scss'
})
export class MainComponentComponent {

  /* userName = JSON.parse(sessionStorage.getItem('user')!).name;
  userProfile = JSON.parse(sessionStorage.getItem('user')!).picture; */

  constructor(private authService: AuthService) {}

  signOut() {
    sessionStorage.removeItem('user');
    this.authService.signOut();
    alert('Successfully Signed Out');
  }

}
