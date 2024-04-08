import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
export function passwordMatched():ValidatorFn{
    return(control:AbstractControl):ValidationErrors|null=>{
        let password = control.get("pass");
        let confirmedpassword = control.get("cpass");
        if(!password || !confirmedpassword || !password.value || !confirmedpassword.value){
            return null;
        }
        let valErr = {'UnMatchedPass':{'pass':password.value,'confirm':confirmedpassword.value}}
        return (password.value === confirmedpassword.value)? null : valErr
    }
}
