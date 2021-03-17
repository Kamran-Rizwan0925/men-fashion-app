import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  ActivatedRoute
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()//to use service in component
export class AdminAuthGuard implements CanActivate //canActivate is an interface which forces the the class to have a function that angular will execute before proceeding to the specific route e.g canActivate function
{
  constructor(private authService: AuthService, private router: Router,private urlRoute:Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean>
  {
    const isAuth = this.authService.getIsAuth();
    const isAdmin=this.authService.getIsAdmin();
    if (!(isAuth && isAdmin)) {
      this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
    }
    // let url=this.urlRoute.url;
    // console.log(url);
    // if(isAuth && url=='/login'){
    //   this.router.navigate(['/']);

    // }
    return isAuth;
  }
}
