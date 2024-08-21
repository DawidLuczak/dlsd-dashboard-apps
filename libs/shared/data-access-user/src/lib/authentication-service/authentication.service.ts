import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environment';
import { Account, AuthenticationResponse, Credentials } from '../account';
import { AccountDataService } from '../account-data-service/account-data.service';

export const AUTHENTICATION_SERVICE_API_URL = new InjectionToken<string>(
  'Authentication service api url'
);

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private apiUrl = `${environment.gatewayServiceUrl}${environment.authenticationServiceEndpoint}`;

  public get account() {
    return this.accountDataService.account;
  }

  constructor(
    private httpClient: HttpClient,
    private accountDataService: AccountDataService
  ) {}

  // constructor(
  //   @Inject(AUTHENTICATION_SERVICE_API_URL) private apiUrl: string,
  //   private httpClient: HttpClient
  // ) {}

  public logout() {
    this.accountDataService.clearAuthenticationData();
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

  public signIn(form: Credentials): Observable<undefined> {
    return this.httpClient
      .post<AuthenticationResponse>(`${this.apiUrl}/authenticate`, {
        ...form,
      })
      .pipe(
        tap((response) => {
          this.accountDataService.saveAuthenticationData(response);
        }),
        map(() => undefined)
      );
  }
}
