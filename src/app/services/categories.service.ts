import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  url = 'http://localhost:3000/categories'; // categories from api.json

  constructor(private http: HttpClient) {}

  getAll$(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.url);
  }
}
