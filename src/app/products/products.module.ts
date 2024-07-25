import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ProductsDetailsComponent } from './components/products-details/products-details.component';
import { ProductsService } from './services/products.service';
import { SharedModule } from "../shared/shared.module"; // Import ProductsService
import { ProductComponent } from './components/product/product.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AllProductsComponent,
    ProductsDetailsComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
],
  providers: [
    ProductsService // Provide the ProductsService here
  ],
  exports:[
    AllProductsComponent,
    ProductsDetailsComponent,
    ProductComponent
  ]
})
export class ProductsModule { }
