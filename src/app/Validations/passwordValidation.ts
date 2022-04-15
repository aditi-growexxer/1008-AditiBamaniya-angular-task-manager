import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordValidation(password: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = password.test(control.value);

    return forbidden ? null : { PasswordValidation: { value: control.value } };
  };
}
