import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { OfferModel } from '../models/offer.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:3000/users';

  hasLoggedIn$ = new BehaviorSubject<boolean>(false);
  // isOrganisation = JSON.parse(localStorage.getItem('loggedUser')!)
  //   .isOrganisation;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem('loggedUser')!);
  }

  login(email: string, password: string): Observable<User | null | undefined> {
    return this.getUsers().pipe(
      map((stream: User[]) =>
        stream.find(
          (user) => user.email === email && user.password === password
        )
      )
    );
  }

  register(data: User): Observable<User> {
    return this.http.post<User>(this.url, data);
  }

  logout(): void {
    localStorage.removeItem('loggedUser');
    this.setHasLoggedIn(false);
  }

  setLoggedUser(user: User): void {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    this.setHasLoggedIn(true);
  }

  setHasLoggedIn(hasLogged: boolean): void {
    this.hasLoggedIn$.next(hasLogged);
  }

  getHasLoggedIn(): Observable<boolean> {
    return this.hasLoggedIn$.asObservable();
  }

  update$(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }

  delete$(userId: number | undefined): Observable<User> {
    return this.http.delete<User>(`${this.url}/${userId}`);
  }

  apply$(user: User, offer: OfferModel): Observable<User> {
    user.applications.push(offer); 
    return this.http.put<User>(`${this.url}/${user.id}`, user);
  }
}
