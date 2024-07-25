import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }

  getAllCarts(){
    return this.http.get("https://fakestoreapi.com/carts")
  }
  getCartByDateRange(startDate:string , endDate:string){
    return this.http.get("https://fakestoreapi.com/carts?startdate=" + startDate +"&enddate=" +endDate)
  }
  deleteCart(id:number){
    return this.http.delete("https://fakestoreapi.com/carts/"+id)
  }
  
  
  getProductById(keyword:string){
    return this.http.get("https://fakestoreapi.com/products/"+keyword);
  }



}
