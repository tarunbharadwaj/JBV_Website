declare const google: any;
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  signOut() {
    google.accounts.id.disableAutoSelect();
    this.router.navigate(['/']);
  }
}
