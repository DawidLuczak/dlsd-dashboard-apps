import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { auditTime, map, Observable, of, switchMap } from 'rxjs';

export const emailExistsAsyncValidator =
  (accountExists: (email: string) => Observable<boolean>): AsyncValidatorFn =>
  (control: AbstractControl) => {
    return of({}).pipe(
      auditTime(1000),
      switchMap(() =>
        accountExists(control.value).pipe(
          map((response) => (response ? { emailExists: true } : null))
        )
      )
    );
  };
