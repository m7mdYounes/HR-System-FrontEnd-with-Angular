import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';

export const loginauthGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  if(localStorage.getItem("TOKEN") != null){
    return true;
  }
  else{
    router.navigate(['/']);
    return false;
  }
};
