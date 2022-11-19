import { User } from "../auth/user.model";

export interface OfferModel {
  [x: string]: any;
  id?: number;
  organisationId: number;
  title: string;
  description: string;
  category: string;
  type: string;
  candidates: User[];
}
