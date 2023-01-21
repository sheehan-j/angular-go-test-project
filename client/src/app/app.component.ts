import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface userItem {
  firstname: string;
  lastname: string;
  email: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // These are bound to the inputs in the app component HTML with ngModel
  public firstname = '';
  public lastname = '';
  public email = '';

  public userItems: userItem[] = [
    {
      firstname: 'Jordan',
      lastname: 'Sheehan',
      email: 'js@gmail.com',
    },
    {
      firstname: 'John',
      lastname: 'Doe',
      email: 'jd@gmail.com',
    },
  ];

  constructor(private httpClient: HttpClient) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    const results = await this.httpClient
      .get<userItem[]>('/api/users')
      .toPromise();
  }

  async addUser() {
    await this.httpClient
      .post('/api/users', {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
      })
      .toPromise();

    this.firstname = '';
    this.lastname = '';
    this.email = '';
  }
}
