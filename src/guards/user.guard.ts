import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ConnexionService } from 'src/app/services/connexion.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private connexionService: ConnexionService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.connexionService.isUser()) return true;
    else {
      this.router.navigate(['forbiden']);
      return false;
    }
  }
}
