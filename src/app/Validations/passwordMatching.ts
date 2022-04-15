import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordMatching(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value.password && control.value.confirmPassword) {
      if (control.value.password === '') {
        return { misMatch: true };
      } else {
        if (control.value.password !== control.value.confirmPassword) {
          return { misMatch: true };
        } else {
          return null;
        }
      }
    } else {
      return { misMatch: true };
    }
  };
}
