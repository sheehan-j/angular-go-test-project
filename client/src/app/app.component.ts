import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUserItem } from './user.model';
import { UserService } from './user.service';

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

    public userItems: IUserItem[] | undefined = [];

    constructor(private _http: HttpClient, private _userService: UserService) {}

    ngOnInit() {
        this._userService
            .getAllUsers()
            .subscribe((data: IUserItem[]) => (this.userItems = data));
    }

    loadUsers() {
        console.log('loadUsers called.');

        this._userService
            .getAllUsers()
            .subscribe((data: IUserItem[]) => (this.userItems = data));
    }

    async addUser() {
        const result = await this._userService.addUser({
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
        });

        await this.loadUsers();

        this.firstname = '';
        this.lastname = '';
        this.email = '';
    }
}
