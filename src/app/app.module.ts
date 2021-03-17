import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';//for template driven forms
import {ReactiveFormsModule} from "@angular/forms";
import { CustomFormsModule } from 'ng2-validation'
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import {DataTableModule} from "angular-6-datatable";

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { ProductService } from './product.service';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { CarouselComponent } from './carousel/carousel.component';
// import { ProductsComponent } from './products/products.component';
// import { PantsComponent } from './pants/pants.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsComponent } from './products/products.component';
import { ProductsFilterComponent } from './products/products-filter/products-filter.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './footer/about/about.component';
import { ContactComponent } from './footer/contact/contact.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SectionComponent } from './section/section.component';
import { NewsComponent } from './footer/news/news.component';
import { AdminMessagesComponent } from './admin/admin-messages/admin-messages.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { CheckoutService } from './checkout.service';
import { ContactService } from './contact.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProductFormComponent,
    AdminProductsComponent,
    LoginComponent,
    SignupComponent,
    CarouselComponent,
    // PantsComponent,
    ProductCardComponent,
    ProductsComponent,
    ProductsFilterComponent,
    ShoppingCartComponent,
    FooterComponent,
    AboutComponent,
    ContactComponent,
    CheckoutComponent,
    SectionComponent,
    NewsComponent,
    AdminMessagesComponent,
    AdminOrdersComponent
   ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    CustomFormsModule,
    HttpClientModule,
    DataTableModule,
    AppRoutingModule
  ],
  providers: [
    CategoryService,
    ProductService,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    ShoppingCartService,
    CheckoutService,
    ContactService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
