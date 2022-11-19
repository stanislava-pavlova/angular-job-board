import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { OfferModel } from '../models/offer.model';
import { OffersService } from '../services/offers.service';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss'],
})
export class ApplicantsComponent implements OnInit {
  users!: User[];
  offers: OfferModel[] | undefined | null;
  // users: User[]  | undefined | null;

  constructor(private offersService: OffersService) {}

  ngOnInit(): void {
    // const organisationId = JSON.parse(localStorage.getItem('loggedUser')!).id;

    // this.offersService.getByOrganisationId$(organisationId).subscribe({
    //   next: (offer: OfferModel[] | null | undefined) => {
    //     this.offers = offer;
    //     // this.users = offer?.map((offer: OfferModel) => offer.candidates);
    //   },
    // });
  }
}
