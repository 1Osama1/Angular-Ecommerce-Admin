import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss']
})
export class ProductsDetailsComponent {

  product:any
  loading : boolean = false;
  id!:any 

  constructor( private service:ProductsService ,private route:ActivatedRoute ) {
    this.id = this.route.snapshot.paramMap.get("id") 
    console.log(this.id)
  }
  ngOnInit():void {
    this.getProduct()
    console.log(this.product)
  }
  getProduct(){
    this.loading = true;
    this.service.getProductById(this.id).subscribe((res:any)=>{
      this.product = res;
      this.loading = false;
    } , ( error) =>{
      alert("Error");
      this.loading = false;
      console.log(error.message);
    })
  }
}
