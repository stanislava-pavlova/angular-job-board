import { OfferModel } from '../models/offer.model';

export interface User {
  id?: number;
  isOrganisation: boolean;
  name: string;
  email: string;
  password: string;
  rePassword: string;
  applications: OfferModel[];
}
