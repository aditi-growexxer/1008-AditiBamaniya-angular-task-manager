import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';



@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<any> {
constructor(private auth: AuthService) {
  
}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return of(this.auth.getuser());
  }
}
