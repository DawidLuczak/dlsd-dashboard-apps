import { Injectable, Signal, signal } from '@angular/core';
import { Account, AuthenticationResponse } from '../account';

@Injectable({ providedIn: 'root' })
export class AccountDataService {
  public static readonly ACCOUNT_USERNAME_KEY = 'ACCOUNT_USERNAME_KEY';
  public static readonly ACCOUNT_TOKEN_KEY = 'ACCOUNT_TOKEN_KEY';

  private _account = signal<Account | null>(null);
  public get account(): Signal<Account | null> {
    return this._account.asReadonly();
  }

  constructor() {
    this.loadAccountDataFromStorage();
  }

  public clearAuthenticationData(): void {
    this._account.set(null);
    localStorage.removeItem(AccountDataService.ACCOUNT_USERNAME_KEY);
    localStorage.removeItem(AccountDataService.ACCOUNT_TOKEN_KEY);
  }

  public saveAuthenticationData(
    authenticationResponse: AuthenticationResponse
  ): void {
    localStorage.setItem(
      AccountDataService.ACCOUNT_USERNAME_KEY,
      authenticationResponse.username
    );
    localStorage.setItem(
      AccountDataService.ACCOUNT_TOKEN_KEY,
      authenticationResponse.token
    );
    this._account.set({ email: authenticationResponse.username });
  }

  public loadAccountDataFromStorage(): void {
    const email = localStorage.getItem(AccountDataService.ACCOUNT_USERNAME_KEY);
    if (email) {
      this._account.set({ email });
    }
  }
}
