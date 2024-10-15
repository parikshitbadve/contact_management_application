import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Contact, IContactDetailResponse } from '../../shared/models/Contact';
import { IContactResponse, Pagination } from '../../shared/models/Paginations';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}Contact`;

  constructor(private http: HttpClient) {}

  /**
   * Fetches all contacts with pagination and optional search.
   *
   * @param pageIndex - The index of the page to fetch (1-based).
   * @param pageSize - The number of contacts per page.
   * @param searchText - The search text to filter contacts by first name, last name, or email.
   * @returns An observable of the pagination object containing contacts.
   */

  getContacts(
    pageIndex: number,
    pageSize: number,
    searchText: string
  ): Observable<IContactResponse> {
    let params = new HttpParams()
      .set('pageIndex', pageIndex.toString())
      .set('pageSize', pageSize.toString());

    // If search text is provided, add it to the query parameters
    if (searchText) {
      params = params.set('searchText', searchText);
    }
    return this.http.get<IContactResponse>(this.apiUrl, { params });
  }

  getContactById(id: number): Observable<IContactDetailResponse> {
    return this.http.get<IContactDetailResponse>(`${this.apiUrl}/${id}`);
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact);
  }

  updateContact(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact);
  }

  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
