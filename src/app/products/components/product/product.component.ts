import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ProductsService } from '../../services/products.service'; 





@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  constructor(private router: Router , private sanitizer: DomSanitizer) {
    
  }
@Input() data:any = {}
@Output() item: EventEmitter<any> = new EventEmitter<any>(); // Output property to emit addToCart event
addButton:boolean = false
amount:number = 0



add(){
  this.item.emit({item:this.data , quantity:this.amount});
}
navigateToProduct(productId: number): void {
  this.router.navigate(['/details/', productId]);
  //https://api.escuelajs.co/api/v1/products/40
}


getSafeUrl(url: string): SafeUrl {
  return this.sanitizer.bypassSecurityTrustUrl(url);
}
}
