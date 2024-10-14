import { Component, inject } from '@angular/core';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../shared/models/Contact';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatPaginator } from '@angular/material/paginator';
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

  private contanctService = inject(ContactService);
  ngOnInit(): void {
    this.contanctService.getContacts().subscribe({
      next: (response) => (this.contacts = response),
      error: (error) => console.log(error),
    });
  }
}
