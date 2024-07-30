import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Account, Credentials } from '../account';

export const AUTHENTICATION_SERVICE_API_URL = new InjectionToken<string>(
  'Authentication service api url'
);

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private _account = signal<Account | null>(null);
  public get account() {
    return this._account.asReadonly();
  }

  constructor(
    @Inject(AUTHENTICATION_SERVICE_API_URL) private apiUrl: string,
    private httpClient: HttpClient
  ) {}

  logout() {
    this._account.set(null);
  }

  public getAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(`${this.apiUrl}/accounts`);
  }

  public createAccount(form: Credentials): Observable<Account> {
    return this.httpClient.post<Account>(`${this.apiUrl}/sign-up`, {
      ...form,
    });
  }

  public accountExists(email: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.apiUrl}/exists`, email);
  }

  public signIn(form: Credentials): Observable<Account> {
    return this.httpClient
      .post<Account>(`${this.apiUrl}/authenticate`, {
        ...form,
      })
      .pipe(
        tap((result) => {
          console.log(result);
          this._account.set(form);
        })
      );
  }
}
