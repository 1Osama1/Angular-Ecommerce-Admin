import { Component } from '@angular/core';
import { CartsService } from '../../services/carts.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})

export class CartsComponent {
  
  constructor( private service:CartsService, private build:FormBuilder ) {
    this.form = this.build.group({
      start : [''],
      end : ['']
    })
  }

  
  ngOnInit():void {
    this.getCarts()
  }
  
  loading : boolean = false;
  cartProducts:any[] = [{}]
  finalProducts:any[]=[{}]
  cart:any[] = []
  product:any
  orderDate : any
  total:any = 0
  carts:any[] = []
  form:FormGroup
  cartDetails:any
  selectedCartIndex: number | null = null;



  openModal(index: number): void {
    this.selectedCartIndex = index;
  }

  closeModal(): void {
    this.selectedCartIndex = null;
  }

  getTotal(products: { price: number, quantity: number }[]): number {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
  }


  
  
getCarts(){
  this.service.getAllCarts().subscribe((res:any) =>{
    this.carts = res
  })
}


deleteCart(cartId:number){
  this.service.deleteCart(cartId).subscribe((res:any) =>{
    this.applyFilter()
    alert("Cart Deleted Successfully")
  })
}


applyFilter(){
  this.service.getCartByDateRange(this.form.value.start,this.form.value.end).subscribe((res:any) =>{
    this.carts = res
})
}

viewCart(cartIndex:number){
  this.cartDetails = this.carts[cartIndex]
  this.orderDate = this.cartDetails.data
  this.finalProducts = [];
  console.log( " cartsDetails: ")
  console.log( this.cartDetails)


  this.cartDetails.products.forEach((product: any, index: number) => {
    this.getProduct(product.productId).then(productDetails => {
      this.finalProducts.push({
        ...productDetails,
        quantity: product.quantity
      });

      // Calculate total only after all products are fetched
      if (index === this.cartDetails.products.length - 1) {
        this.calculateTotal();
      }
    });
  });
  console.log( " final productsssssssssssss: " + this.finalProducts)
  console.log( this.finalProducts)

  this.selectedCartIndex = cartIndex;
}

getProduct(id: string): Promise<any> {
  this.loading = true;
  return new Promise((resolve, reject) => {
    this.service.getProductById(id).subscribe(
      (res: any) => {
        this.loading = false;
        resolve(res);
      },
      (error) => {
        this.loading = false;
        console.error(error.message);
        reject(error);
      }
    );
  });
}

calculateTotal(): void {
  this.total = this.finalProducts.reduce((acc, product) => {
    return acc + (product.price * product.quantity);
  }, 0);
}




}
