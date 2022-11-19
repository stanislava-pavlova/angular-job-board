import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  hasLoggedIn!: boolean;
  isOrganisation!: boolean;

  destroy$ = new Subject<boolean>();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.getLoggedUser()) {
      this.hasLoggedIn = true;
    } else {
      this.hasLoggedIn = false;
    }

    this.isOrganisation = this.authService.getLoggedUser()?.isOrganisation;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
