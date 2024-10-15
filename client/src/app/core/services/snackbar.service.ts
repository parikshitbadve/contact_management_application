import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private snackbar = inject(MatSnackBar);
  private router = inject(Router);
  error(message: string) {
    this.snackbar.open(message, 'close', {
      duration: 5000,
      panelClass: ['snack-error'],
    });
  }

  success(message: string) {
    const snackBarRef = this.snackbar.open(message, 'close', {
      duration: 3000,
      panelClass: ['snack-success'],
    });
    snackBarRef.afterDismissed().subscribe(() => {
      // Redirect to the contact page after Snackbar is closed
      this.router.navigate(['/']);
    });
  }
}
