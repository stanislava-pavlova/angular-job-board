import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  styleUrls: ['./about-section.component.scss'],
})
export class AboutSectionComponent implements OnInit {
  hasLoggedIn: boolean | undefined;

  loggedUser!: User;

  destroy$ = new Subject<boolean>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.getLoggedUser()) {
      this.hasLoggedIn = true;
    } else {
      this.hasLoggedIn = false;
    }
  }
}
