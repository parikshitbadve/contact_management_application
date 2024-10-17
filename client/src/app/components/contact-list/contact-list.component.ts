import { Component, inject } from '@angular/core';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../shared/models/Contact';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../shared/models/Paginations';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../shared/components/confirmation-modal/confirmation-modal.component';
import { SnackbarService } from '../../core/services/snackbar.service';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    MatPaginator,
    FormsModule,
    RouterLink,
    ContactDetailComponent,
    CommonModule,
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent {
  private contactService = inject(ContactService);
  private dialog = inject(MatDialog);
  private snack = inject(SnackbarService);

  // variable declaration
  contacts: Contact[] = [];
  pagination: Pagination | null = null;
  pageIndex: number = 1;
  pageSize: number = 5;
  searchText: string = '';
  pageSizeOptions = [5, 10, 15, 20];
  selectedContact: Contact | null = null;
  isFormVisible: boolean = false;
  isGridVisible: boolean = true;

  // Form group for adding/updating contacts
  addUpdateContact: FormGroup;
  validationErrors: string[] | null = null; // Variable to hold validation error messages

  constructor(private fb: FormBuilder) {
    // Initialize the add/update form with validation rules
    this.addUpdateContact = this.fb.group({
      id: [0], // Contact ID (0 for new contacts)
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loadContacts(); // Load contacts when the component initializes
  }

  // Method to load contacts from the server
  loadContacts(): void {
    this.contactService
      .getContacts(this.pageIndex, this.pageSize, this.searchText)
      .subscribe({
        next: (response) => {
          this.contacts = response.data.data; // Set contacts from the response
          console.log('shyam', this.contacts); // Debug log for loaded contacts
          this.pagination = response.data; // Set pagination data
        },
        error: (error) => this.snack.error(error.statusText), // Show error message if API call fails
      });
  }

  // Method to handle editing a contact
  handleEditContact = async (contactId: number) => {
    if (contactId > 0) {
      this.contactService.getContactById(+contactId).subscribe({
        next: (response) => {
          // Patch the form with the selected contact's details
          this.addUpdateContact.patchValue({
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
          });
          this.isFormVisible = true; // Show the contact form
          this.isGridVisible = false; // Hide the contact list table
        },
        error: (error) => this.snack.error(error),
      });
    } else {
      this.addUpdateContact.reset({ id: 0 }); // Reset the form fields for a new contact
      this.isFormVisible = true;
      this.isGridVisible = false;
    }
  };

  // Method to handle pagination events
  handlePageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex + 1;
    this.pageSize = e.pageSize;
    this.loadContacts();
  }

  // Method to search for contacts
  onSearchContact() {
    this.pageIndex = 1; // Reset to the first page
    this.loadContacts();
  }

  // Method to handle deleting a contact
  handleDeleteContact(contactId: number) {
    // Open a confirmation dialog before deleting
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '300px',
      data: { id: contactId },
    });

    // Handle the result of the dialog
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Proceed to delete the contact if confirmed
        this.contactService.deleteContact(contactId).subscribe({
          next: () => {
            this.snack.success('Contact deleted successfully!');
            this.searchText = this.searchText !== '' ? '' : this.searchText;
            this.pageIndex = 1; // Reset to the first page
            this.loadContacts(); // Reload contacts
          },
          error: () => {
            this.snack.error('Failed to delete contact.');
          },
        });
      }
    });
  }

  // Method to handle form submission for adding/updating a contact
  handleSubmitContact(): void {
    if (this.addUpdateContact.valid) {
      const contact = this.addUpdateContact.value as Contact;
      if (contact.id > 0) {
        // Update existing contact
        this.contactService.updateContact(contact.id, contact).subscribe({
          next: (response) => {
            this.snack.success('Record Updated successfully');
            this.loadContacts();
            this.isFormVisible = false;
            this.isGridVisible = true;
          },
          error: (error) => this.snack.error(error),
        });
      } else {
        // Create new contact
        this.contactService.createContact(contact).subscribe({
          next: (response) => {
            this.snack.success('Record Created successfully');
            this.loadContacts();
            this.isFormVisible = false;
            this.isGridVisible = true;
          },
          error: (error) => this.snack.error(error),
        });
      }
    }
  }
}
