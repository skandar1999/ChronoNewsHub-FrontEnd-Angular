import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileComponent } from 'src/app/profile/profile.component';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  admin: boolean = false;

  constructor( private router: Router) {}
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (ProfileComponent)
    return this.admin = true;
    else
    {
    this.router.navigate(['forbiden']);
    return false;
    }
  
}
}
