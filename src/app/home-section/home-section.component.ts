import { Component, OnInit } from '@angular/core';
import { OfferModel } from '../models/offer.model';
import { OffersService } from '../services/offers.service';

@Component({
  selector: 'app-home-section',
  templateUrl: './home-section.component.html',
  styleUrls: ['./home-section.component.scss'],
})
export class HomeSectionComponent implements OnInit {
  offers!: OfferModel[];

  constructor(private offersService: OffersService) {}

  ngOnInit(): void {
    this.offersService.getAll$().subscribe({
      next: (response: OfferModel[]) => {
        this.offers = response;
      },
    });
  }
}
