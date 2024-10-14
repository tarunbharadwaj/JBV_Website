/**
 * 1)Check User exists in DB or not
 * 2)Check User logged in or not
 */
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

export const authGuard = async (route: any) => {
  const router = inject(Router);
  const http = inject(HttpService);

  // Check if we are in a browser environment
  const isBrowser =
    typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';

  if (isBrowser) {
    // Get the user from sessionStorage
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');

    if (user && user.email) {
      try {
        // Fetch allowed emails from the backend using the user email
        const allowedUser = await http
          .get(`http://localhost:3000/user/${user.email}`)
          .toPromise();

        if (allowedUser) {
          // If the user is allowed, grant access
          if (route?.routeConfig?.path === 'login') {
            // If the user tries to access /login while logged in, redirect to dashboard
            router.navigate(['/dashboard']);
            return false;
          }
          // Allow access to other routes
          return true;
        } else {
          // If user email is not allowed, redirect to login
          router.navigate(['/login']);
          return false;
        }
      } catch (error) {
        // If the backend call fails, redirect to login or handle the error
        router.navigate(['/login']);
        return false;
      }
    } else {
      // User is not logged in
      if (route?.routeConfig?.path === 'login') {
        // Allow access to /login route when not logged in
        return true;
      }

      // Redirect to login page if trying to access any other route
      router.navigate(['/login']);
      return false;
    }
  } else {
    // If not in a browser environment, deny access or return false to prevent errors
    return false;
  }
};
