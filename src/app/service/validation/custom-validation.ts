import {AbstractControl, ValidatorFn} from '@angular/forms';

export class CustomValidation {
  static equalValidation(c: AbstractControl, v: AbstractControl): ValidatorFn {
    return function () {
      const result = v.value !== c.value;
      return result ? { 'valid': false } : null;
    };
  };
}
