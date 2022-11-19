import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { OfferModel } from '../models/offer.model';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit {
  user!: User;
  offer!: OfferModel;

  // offers: OfferModel[] | undefined | null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getLoggedUser();
    this.offer = this.user.applications[1];

    // console.log(
    //   this.user.applications.map((offer) => {
    //     return offer;
    //   })
    // );
  }
}
