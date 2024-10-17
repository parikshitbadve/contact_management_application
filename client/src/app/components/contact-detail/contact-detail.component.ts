import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
  @Input() addUpdateContact!: FormGroup; // The form group passed from the parent.
  @Input() validationErrors!: string[] | null; // Validation errors from the parent component.

  @Output() formSubmitted = new EventEmitter<void>();

  handleSubmitContact() {
    this.formSubmitted.emit();
  }

  ngOnInit(): void {}
}
