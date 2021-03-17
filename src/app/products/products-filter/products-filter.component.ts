import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.css']
})
export class ProductsFilterComponent implements OnInit {
  @Input ('category') category;

  public isMenuCollapsed = true;
  constructor() {
    // console.log(this.category);
   }

  ngOnInit() {
  }

}
