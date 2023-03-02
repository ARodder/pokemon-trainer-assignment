import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "../shared/user.model";
import { UserService } from "./user.service";



export class AuthGuard {
  
   canActivate(userService:UserService,router:Router){
      if(userService.getUser() || localStorage.getItem("user"))return true;
      router.navigateByUrl('/');
      return false;
   }
}

export const canActivateTeam: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
   return inject(AuthGuard).canActivate(inject(UserService),inject(Router));
 };