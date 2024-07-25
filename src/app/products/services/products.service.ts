import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }
  getAllProducts(){
    return this.http.get("https://6699902f2069c438cd729a3c.mockapi.io/api/Ocommerce/products");
  }

  getAllCategories(){
    return this.http.get("https://6699902f2069c438cd729a3c.mockapi.io/api/Ocommerce/categories");
  }


  getProductById(keyword:string){
    return this.http.get("https://api.escuelajs.co/api/v1/products/"+keyword);
  }

  addProduct(product:any){
    return this.http.post("https://fakestoreapi.com/products",product);
  }
}
