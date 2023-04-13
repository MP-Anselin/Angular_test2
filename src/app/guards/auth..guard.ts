import {AuthenticationService} from '../services/authentication.service';
import {Observable} from "rxjs";
import {Router, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthenticationService, private router: Router) { }
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    // logged in, so return true
    this.authService.isLoggedIn();
    return true;
  }
}
