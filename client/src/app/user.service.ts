import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IUserItem } from './user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    users_url: string = 'http://localhost:9000/api/users';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private _http: HttpClient) {}

    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `,
                error.error
            );
        }
        // Return an observable with a user-facing error message.
        return throwError(
            () => new Error('Something bad happened; please try again later.')
        );
    }

    getAllUsers(): Observable<IUserItem[]> {
        return this._http
            .get<IUserItem[]>(this.users_url)
            .pipe(retry(3), catchError(this.handleError));
    }

    // *** Should the service await the
    async addUser(user: IUserItem): Promise<IUserItem | undefined> {
        const data = await this._http
            .post<IUserItem>(this.users_url, user, this.httpOptions)
            .pipe(retry(3), catchError(this.handleError))
            .toPromise();

        console.log('User created: ' + JSON.stringify(data));

        return data;
    }
}
