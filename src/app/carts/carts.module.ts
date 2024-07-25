import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartsService } from './services/carts.service';
import { CartsComponent } from './components/carts/carts.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from "../shared/shared.module"; // Import ProductsService






@NgModule({
  declarations: [
    CartsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule
  ],
  providers: [
    CartsService // Provide the ProductsService here
  ],
  exports:[
    CartsComponent
  ]
})
export class CartsModule { }
