import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from '@env/environment';
import {ItemsPaginatedResponse} from "@types";

@Injectable({ providedIn: 'root' })
export class ItemService {
  private apiUrl = environment.apiUrl + 'items'; // Use the environment variable

  constructor(private http: HttpClient) {}

  getItems(
    pageNumber: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{ key: string; value: string[] }>,
    searchTerm: string | null
  ): Observable<ItemsPaginatedResponse> {
    let params = new HttpParams()
      .set('pageNumber', `${pageNumber}`)
      .set('pageSize', `${pageSize}`)
      .set('sortField', sortField || '')
      .set('sortOrder', sortOrder || '');
      if (searchTerm) {
        params = params.set('searchTerm', searchTerm);
      }

    filters.forEach((filter) => {
      filter.value.forEach((value) => {
        params = params.append(filter.key, value);
      });
    });

    return this.http
      .get<ItemsPaginatedResponse>(this.apiUrl, { params });
  }

  createItem(item: any): Observable<void> {
    return this.http.post<void>(this.apiUrl, item);
  }

  updateItem(itemId: string, item: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${itemId}`, item);
  }

  getItemById(itemId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${itemId}`);
  }

  deleteItem(itemId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${itemId}`);
  }
}
