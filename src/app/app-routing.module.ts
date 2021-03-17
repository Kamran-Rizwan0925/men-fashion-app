import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { CarouselComponent } from './carousel/carousel.component';
import { AdminAuthGuard } from './auth/admin-auth.guard';
// import { ProductsComponent } from './products/products.component';
// import { PantsComponent } from './pants/pants.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AboutComponent } from './footer/about/about.component';
import { ContactComponent } from './footer/contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { NewsComponent } from './footer/news/news.component';
import { AdminMessagesComponent } from './admin/admin-messages/admin-messages.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';


const routes: Routes = [
  {path:'',component:ProductsComponent},
  {path:'admin/product-form',component:ProductFormComponent,canActivate:[AuthGuard,AdminAuthGuard]},
  {path:'admin/product-form/:prodId',component:ProductFormComponent,canActivate:[AuthGuard,AdminAuthGuard]},
  {path:'admin/admin-products',component:AdminProductsComponent,canActivate:[AuthGuard,AdminAuthGuard]},
  {path:'admin/admin-messages',component:AdminMessagesComponent,canActivate:[AuthGuard,AdminAuthGuard]},
  {path:'admin/admin-orders',component:AdminOrdersComponent,canActivate:[AuthGuard,AdminAuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:ProductCardComponent},
  // {path:'pants',component:PantsComponent},
  {path:'shopping-cart',component:ShoppingCartComponent},
  {path:'about',component:AboutComponent},
  {path:'contact',component:ContactComponent},
  { path: 'news', component: NewsComponent },
  {path:'checkout',component:CheckoutComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard,AdminAuthGuard]//it is a guard to protect some routes register in providers array.
})
export class AppRoutingModule { }
