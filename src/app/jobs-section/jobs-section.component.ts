import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { OfferModel } from '../models/offer.model';
import { OffersService } from '../services/offers.service';

@Component({
  selector: 'app-jobs-section',
  templateUrl: './jobs-section.component.html',
  styleUrls: ['./jobs-section.component.scss'],
})
export class JobsSectionComponent implements OnInit {
  offers?: OfferModel[];
  isOrganisation!: boolean;

  constructor(
    private offersService: OffersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isOrganisation = this.authService.getLoggedUser()?.isOrganisation;

    this.offersService.getAll$().subscribe({
      next: (response: OfferModel[]) => {
        this.offers = response;
      },
    });
  }
}
