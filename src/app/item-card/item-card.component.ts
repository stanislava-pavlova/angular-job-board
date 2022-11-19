import { Component, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { OfferModel } from '../models/offer.model';
import { OffersService } from '../services/offers.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss'],
})
export class ItemCardComponent {
  @Input() offer!: OfferModel;
  user!: User;

  isOrganisation!: boolean;
  hasApplied!: boolean;

  constructor(
    private authService: AuthService,
    private offersService: OffersService
  ) {}

  ngOnInit(): void {
    this.isOrganisation = this.authService.getLoggedUser()?.isOrganisation;
    this.user = this.authService.getLoggedUser();
  }

  onApply(offer: OfferModel): void {
    this.hasApplied = true;
    this.offersService.apply$(offer).subscribe();
  }

  onApplied(user: User, offer: OfferModel): void {
    this.authService.apply$(user, offer).subscribe();
  }
}
