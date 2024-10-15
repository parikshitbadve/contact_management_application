import { Component, inject } from '@angular/core';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../shared/models/Contact';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../shared/models/Paginations';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';
import { SnackbarService } from '../../core/services/snackbar.service';
@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [MatIcon, MatButton, MatPaginator, FormsModule, RouterLink],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent {
  private contactService = inject(ContactService);
  private dialog = inject(MatDialog);
  contacts: Contact[] = [];
  pagination: Pagination | null = null;
  pageIndex: number = 1;
  pageSize: number = 5;
  searchText: string = '';
  pageSizeOptions = [5, 10, 15, 20];

  private contanctService = inject(ContactService);
  private snack = inject(SnackbarService);
  ngOnInit(): void {
    this.loadContacts();
  }

  loadContacts(): void {
    this.contanctService
      .getContacts(this.pageIndex, this.pageSize, this.searchText)
      .subscribe({
        next: (response) => {
          this.contacts = response.data.data;
          console.log('shyam', this.contacts);
          this.pagination = response.data;
        },
        error: (error) => this.snack.error(error.statusText),
      });
  }

  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex + 1;
    (this.pageSize = e.pageSize), this.loadContacts();
  }

  onSearchContact() {
    this.pageIndex = 1;
    this.loadContacts();
  }

  handleDeleteContact(contactId: number) {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: { id: contactId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.contactService.deleteContact(contactId).subscribe({
          next: () => {
            this.snack.success('Contact deleted successfully!');
            this.searchText =
              this.searchText !== '' ? (this.searchText = '') : this.searchText;
            this.pageIndex = 1;
            this.loadContacts();
          },
          error: () => {
            this.snack.error('Failed to delete contact.');
          },
        });
      }
    });
  }
}
