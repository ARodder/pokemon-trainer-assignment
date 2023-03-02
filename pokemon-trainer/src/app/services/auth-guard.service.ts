import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { Subscription } from "rxjs";
import { User } from "../shared/user.model";
import { UserService } from "./user.service";


/**
 * Creates a filter such that one can only access what the filter is applied
 * to if they fullfil the requirement.
 */
export class AuthGuard {
  
   canActivate(userService:UserService,router:Router){
      if(userService.getUser() || localStorage.getItem("user"))return true;
      router.navigateByUrl('/');
      return false;
   }
}
/**
 * Formats the GuardFilter
 * 
 * @param route ActivatedRouteSnapshot
 * @param state RouterStateSnapshot
 * @returns 
 */
export const canActivateTeam: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
   return inject(AuthGuard).canActivate(inject(UserService),inject(Router));
 };