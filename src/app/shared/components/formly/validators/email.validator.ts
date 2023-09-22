import { AbstractControl, ValidationErrors } from "@angular/forms";

export function emailValidator (control: AbstractControl): ValidationErrors | null  {
  let emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegExp.test(control.value)
    ? null
    : { 'email': true };
}
