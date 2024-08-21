import {
  ChangeDetectionStrategy,
  Component,
  effect,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import {
  AccountFormMode,
  AUTHENTICATION_SERVICE_API_URL,
  AuthenticationService,
  CreateAccountForm,
  environment,
} from '@dlsd/data-access-user';

import { DLSDButtonComponent, DLSDInputComponent } from 'dlsd-angular-ui';
import { emailExistsAsyncValidator } from '../email-exists-async-validator/email-exists-async-validator';
import { passwordConfirmValidator } from '../password-confirm-validator/password-confirm-validator';

@Component({
  standalone: true,
  selector: 'dlsd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [DLSDInputComponent, DLSDButtonComponent, ReactiveFormsModule],
  providers: [
    {
      provide: AUTHENTICATION_SERVICE_API_URL,
      useValue:
        environment.gatewayServiceUrl +
        environment.authenticationServiceEndpoint,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  protected readonly AccountFormMode = AccountFormMode;

  protected formMode = signal<AccountFormMode>(AccountFormMode.SIGN_IN);
  protected form: FormGroup = this.fb.group({
    email: this.fb.control<string>('', [Validators.required]),
    password: this.fb.control<string>('', [Validators.required]),
  });

  protected get emailControl() {
    return this.form.controls['email'];
  }

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    effect(() => {
      const formMode = this.formMode();
      if (formMode === AccountFormMode.SIGN_IN) {
        this.form.removeControl('passwordConfirm');
        this.emailControl.clearAsyncValidators();
        this.emailControl.updateValueAndValidity();
      } else {
        this.form.setControl(
          'passwordConfirm',
          this.fb.control<string>('', [
            Validators.required,
            passwordConfirmValidator(this.form.controls['password']),
          ])
        );
        this.emailControl.addAsyncValidators(
          emailExistsAsyncValidator((email) =>
            this.authenticationService.accountExists(email)
          )
        );
      }
    });
  }

  protected updatePasswordConfirmControlValidity(): void {
    this.form.controls['passwordConfirm']?.updateValueAndValidity();
  }

  protected submitForm(): void {
    if (this.form.invalid) return;

    const accountForm: CreateAccountForm = this.form.getRawValue();

    if (this.formMode() === AccountFormMode.SIGN_IN) {
      this.signIn(accountForm);
    } else {
      this.signUp(accountForm);
    }
  }

  private signIn(accountForm: CreateAccountForm): void {
    this.authenticationService.signIn(accountForm).subscribe({
      next: () => this.router.navigate(['/']),
      error: (error) => console.log(error),
    });
  }

  private signUp(accountForm: CreateAccountForm): void {
    this.authenticationService.createAccount(accountForm).subscribe();
  }
}
