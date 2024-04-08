import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function Contractdatevalidation(companyEstablishmentDate: Date):ValidatorFn{
    return(control:AbstractControl):ValidationErrors|null => {
        let contractDate = control.get('contractDate');
        if (contractDate?.value < companyEstablishmentDate) {
            return { 'dateBeforeEstablishment': true };
          }
          return null;
    }
}