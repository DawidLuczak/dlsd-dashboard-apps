import { AbstractControl, ValidatorFn } from '@angular/forms';

export const passwordConfirmValidator =
  (passwordControl: AbstractControl): ValidatorFn =>
  (control: AbstractControl) => {
    return passwordControl.value !== control.value
      ? { passwordConfirm: true }
      : null;
  };
