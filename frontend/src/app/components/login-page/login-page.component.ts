import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { error } from 'console';
declare var google: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent implements OnInit {
  constructor(private http: HttpService, private router: Router) {}

  apiUrl = 'http://localhost:3000/user';

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id:
        '924536866030-hl6ibm0o3eh4400s1k2akpqcdsnhbt26.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp),
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: '120px',
    });
  }

  handleLogin(response: any) {
    if (response) {
      //decode the token
      const payLoad = this.decodeToken(response.credential);
      console.log('Checking decodeToken>>>', payLoad);

      const userEmail = payLoad.email;
      console.log('Checking userEmail>>>', userEmail);

      this.http.get(`${this.apiUrl}/${userEmail}`).subscribe(
        (user) => {
          if (user && !user.message) {
            console.log('checking user details>>>', user);
            // Store user data in sessionStorage and navigate to dashboard
            sessionStorage.setItem('user', JSON.stringify(payLoad));

            /* console.log('Checking session storage>>>>', JSON.stringify(payLoad)); */

            this.router.navigate(['/dashboard']);
          } else {
            // User is not authorized
            alert(
              'Access Denied: You are not allowed to access this application.'
            );
          }
        },
        (error) => {
          console.error('Error fetching user from backend', error);
          alert('Access Denied: Error verifying user.');
        }
      );

      //store it in session
      // sessionStorage.setItem("user", JSON.stringify(payLoad));

      //navigate to dashboard
      // this.router.navigate(['dashboard']);
    }
  }

  private decodeToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
