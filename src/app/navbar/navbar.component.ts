import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { AuthData } from '../auth/auth-data.model';
import { ShoppingCart } from '../Models/ShoppingCart.model';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  public isMenuCollapsed = true;
  userIsAuthenticated = false;
  private authListenerSubs:Subscription;
  private isUser$:Subscription;
  user:AuthData;
  cart;
  subscription:Subscription;
  items:Number=0;
  constructor(private authService:AuthService,private shoppingCartService:ShoppingCartService) { }

  async ngOnInit(){
    this.userIsAuthenticated=this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
      this.user=this.authService.getUser();
      this.isUser$=this.authService.getUserObservable().subscribe(user=>{
        this.user=user;
        // console.log(this.user);
      });

      this.subscription= this.shoppingCartService.getItemsUpdateListener().subscribe(result=>{
        this.items=result;
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.authListenerSubs.unsubscribe();
    this.isUser$.unsubscribe();
  }
  logout(){
    this.authService.logout();
  }
}
