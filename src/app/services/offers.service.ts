import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OfferModel } from '../models/offer.model';
import { map, Observable } from 'rxjs';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  url = 'http://localhost:3000/offers';

  currentUser = JSON.parse(localStorage.getItem('loggedUser')!);

  constructor(private http: HttpClient) {}

  getAll$(): Observable<OfferModel[]> {
    return this.http.get<OfferModel[]>(this.url);
  }

  getById$(id: number): Observable<OfferModel> {
    return this.http.get<OfferModel>(`${this.url}/${id}`);
  }

  getByOrganisationId$(
    organisationId: number
  ): Observable<OfferModel[] | null | undefined> {
    return this.http.get<OfferModel[]>(this.url).pipe(
      map((response: OfferModel[]) => {
        const offer = response.filter(
          (o) => o.organisationId === organisationId
        );

        if (offer) {
          return offer;
        }

        return null;
      })
    );
  }

  post$(body: OfferModel): Observable<any> {
    return this.http.post<void>(this.url, body);
  }

  put$(body: OfferModel): Observable<OfferModel> {
    return this.http.put<OfferModel>(`${this.url}/${body.id}`, body);
  }

  delete$(id: number): Observable<undefined> {
    return this.http.delete<undefined>(`${this.url}/${id}`);
  }

  apply$(offer: OfferModel): Observable<OfferModel> {
    if (!offer.candidates.includes(this.currentUser)) {
      offer.candidates.push(this.currentUser)
    }
    return this.http.put<OfferModel>(`${this.url}/${offer.id}`, offer);
  }
}
