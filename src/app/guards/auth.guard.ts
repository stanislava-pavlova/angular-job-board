import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const loggedUser = this.authService.getLoggedUser();

    if (loggedUser) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
