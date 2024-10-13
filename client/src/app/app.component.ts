import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  baseUrl = 'http://localhost:5000/api/';
  private http = inject(HttpClient);
  title = 'Contacts Management Application';

  ngOnInit(): void {
    this.http.get(this.baseUrl + 'Contact').subscribe({
      next: (response) => console.log(response),
      error: (error) => console.log(error),
      complete: () => console.log('complete'),
    });
  }
}
