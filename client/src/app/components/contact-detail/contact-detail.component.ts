import { Component, inject } from '@angular/core';
import { ContactService } from '../../core/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../../shared/models/Contact';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCard } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-contact-detail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatFormField,
    MatLabel,
    MatInput,
    MatButton,
    MatError,
    TextInputComponent,
  ],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css',
})
export class ContactDetailComponent {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private route = inject(ActivatedRoute);
  private router = inject(Router); // Inject Router for navigation
  private snack = inject(SnackbarService);
  private contact: Contact = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
  };
  addUpdateContact = this.fb.group({
    id: [0],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });
  validationErrors?: string[];
  ngOnInit(): void {
    this.getContactDetails();
  }

  getContactDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // If ID is present, it means we are in update mode
      if (isNaN(+id)) {
        this.router.navigate(['/not-found']);
        return;
      }
      this.contactService.getContactById(+id).subscribe({
        next: (response) => {
          this.contact = response.data;
          this.addUpdateContact.patchValue({
            id: response.data.id,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
          });
        },
        error: (error) => this.snack.error(error.searchText),
      });
    }
  }

  handleSubmitContact(): void {
    if (this.addUpdateContact.value) {
      this.contact = this.addUpdateContact.value as Contact;
      if (this.contact.id > 0) {
        //Update existing contact
        this.contactService
          .updateContact(this.contact.id, this.contact)
          .subscribe({
            next: (response) => {
              this.snack.success('Record Updated succesfully');
            },
            error: (error) => this.snack.error(error.statusText),
          });
      } else {
        // Create new contact
        this.contactService.createContact(this.contact).subscribe({
          next: (response) => {
            this.snack.success('Record Created succesfully');
          },
          error: (error) => this.snack.error(error.statusText),
        });
      }
    }
  }
}
