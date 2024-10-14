import { Component, inject } from '@angular/core';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../shared/models/Contact';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../shared/models/Paginations';
@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [MatIcon, MatButton, MatPaginator],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent {
  private contactService = inject(ContactService);

  contacts: Contact[] = [];
  pagination: Pagination | null = null;
  pageIndex: number = 1;
  pageSize: number = 5;
  searchText: string = '';
  pageSizeOptions = [5, 10, 15, 20];

  private contanctService = inject(ContactService);
  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contanctService
      .getContacts(this.pageIndex, this.pageSize, this.searchText)
      .subscribe({
        next: (response) => {
          this.contacts = response.data;
          this.pagination = response;
        },
        error: (error) => console.log(error),
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex + 1;
    (this.pageSize = e.pageSize), this.loadContacts();
  }
}
