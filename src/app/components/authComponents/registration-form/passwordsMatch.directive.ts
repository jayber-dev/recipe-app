import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";


export const passwordsMatch: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const pass = control.get('pass');
    const passRepeat = control.get('passRepeat');
   
    return (passRepeat.value !== '' && pass.value === passRepeat.value) ? null:{passwordsMatch:false};
  };