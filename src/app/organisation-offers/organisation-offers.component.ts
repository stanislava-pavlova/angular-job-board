import { Component, OnInit } from '@angular/core';
import { OfferModel } from '../models/offer.model';
import { OffersService } from '../services/offers.service';

@Component({
  selector: 'app-organisation-offers',
  templateUrl: './organisation-offers.component.html',
  styleUrls: ['./organisation-offers.component.scss'],
})
export class OrganisationOffersComponent implements OnInit {
  offers: OfferModel[] | undefined | null;

  constructor(private offersService: OffersService) {}

  ngOnInit(): void {
    const organisationId = JSON.parse(localStorage.getItem('loggedUser')!).id;

    this.offersService.getByOrganisationId$(organisationId).subscribe({
      next: (offer: OfferModel[] | null | undefined) => {
        this.offers = offer;
      },
    });
  }

  onDelete(id: number): void {
    this.offersService.delete$(id).subscribe({
      next: () => {
        this.offers = this.offers?.filter((o) => o.id !== id);
      },
    });
  }
}
