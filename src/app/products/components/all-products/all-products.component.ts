import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';





@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent {
products:any[]=[]
categories:any[]=[]
cartProducts:any[]=[]
chosenCategory:string = 'All'
category :any;
loading : boolean = false;
gridView:boolean = false
base64:any = ''
form!:FormGroup



  fileName: string = 'No files chosen';
  newProductCategories = this.categories

    




constructor( private service:ProductsService , private router: Router , private sanitizer: DomSanitizer , private fb: FormBuilder , private builder:FormBuilder) {

  

  window.onclick = (event) => {
    const modal = document.getElementById('addProductModal');
    if (event.target == modal) {
      this.closeModal();
    }
  };
  window.onclick = (event) => {
    const modal = document.getElementById('updateProductModal');
    if (event.target == modal) {
      this.closeUpdateModal();
    }
  };

}
ngOnInit():void {
  this.getProducts()
  this.getCategories()
  this.form = this.builder.group({
    title: ['', Validators.required],
    image: [null, Validators.required],
    price: ['', [Validators.required, Validators.min(0)]],
    category: ['', Validators.required],
    description: ['', Validators.required]
  });
}

getProducts(){
  this.loading = true;

    this.service.getAllProducts().subscribe((res: any) => {
      this.products = res.map((product: any) => {
        product.images[0] = this.sanitizeImageUrl(product.images);
        return product;
    });
    this.loading = false;
  } , ( error) =>{
    alert("Error");
    this.loading = false;
    console.log(error.message);
  })
}
toggleGridView(){
  this.gridView = !this.gridView
}
getCategories(){
  this.loading = true;
  this.service.getAllCategories().subscribe((res:any)=>{
    this.categories = res;
    this.loading = false;
  } , ( error) =>{
    this.loading = false;
    alert("Error");
    console.log(error.message);
  })
}
filterCategory(event:any){
  this.loading = true;
  this.chosenCategory = event.target.value;
  if(this.chosenCategory == "All")
    {
      this.getProducts();
    }
    else{
      
      this.service.getAllProducts().subscribe((res: any) => {

        this.products = res.filter((product: any) => product.category.name === this.chosenCategory );
        this.products = this.products.map((product: any) => {
          product.images[0] = this.sanitizeImageUrl(product.images);
          return product;
      });
        this.loading = false;
      }, (error) => {
        alert("Error");
        this.loading = false;
        console.log(error.message);
      })
    }
}

addToCart(event: any): void {
  if("cart" in localStorage){
    this.cartProducts = JSON.parse(localStorage.getItem("cart")!);
    let exist = this.cartProducts.find(item=>item.id == event.item.id)
    if(exist){
      alert("Product is already in your cart")
    }
    else{
      this.cartProducts.push(event);
      localStorage.setItem("cart",JSON.stringify(this.cartProducts))
    }
  }
  else{
    this.cartProducts.push(event);
    localStorage.setItem("cart",JSON.stringify(this.cartProducts))
  }
  
}

addNewProduct(product: any): void {
  this.loading = true;
  
  this.service.addProduct(product.value).subscribe(
    (res: any) => {
      alert("New Product Added Successfully");
      this.loading = false; // Set loading to false inside the success callback
    },
    (error) => {
      alert("Error");
      this.loading = false; // Set loading to false inside the error callback
      console.log(error.message);
    }
  );
}
addUpdateProduct(product: any): void {
  this.loading = true;
  
  this.service.addProduct(product.value).subscribe(
    (res: any) => {
      alert("Product Updated Successfully");
      this.loading = false; // Set loading to false inside the success callback
    },
    (error) => {
      alert("Error");
      this.loading = false; // Set loading to false inside the error callback
      console.log(error.message);
    }
  );
}



sanitizeImageUrl(urls: string[]): string {
  // Regular expression to match URLs ending in .jpg or .jpeg
  const regex = /(http[s]?:\/\/.*?\.(?:jpg|jpeg|png))/gi;

  for (const url of urls) {
    const matches = url.match(regex);
    if (matches && matches.length > 0) {
      return matches[0]; // Return the first valid URL
    }
  }

  return ''; // Return an empty string if no valid URL is found
}




openModal() {
  document.getElementById('addProductModal')!.style.display = 'block';
}

closeModal() {
  document.getElementById('addProductModal')!.style.display = 'none';
}
closeUpdateModal() {
  document.getElementById('updateProductModal')!.style.display = 'none';
}

onFileChange(event: any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    const reader = new FileReader
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.base64 = reader.result
      this.form.get('image')?.setValue(this.base64)
    }
    this.form.patchValue({
      image: file
    });
    this.fileName = file.name;
  }
}

onSubmit() {
  if (this.form.valid) {
    this.addNewProduct(this.form)
    this.closeModal();
  }
}
onUpdateSubmit() {
  if (this.form.valid) {
    this.updateProduct(this.form)
    this.closeUpdateModal();
  }
}

updateProduct(product:any){
  console.log("product here it cooooooooooooooooooomes")
  console.log(product)
  document.getElementById('updateProductModal')!.style.display = 'block';
  this.base64 = product.images[0]

  this.form.get('price')?.setValue(product.price)
  this.form.get('image')?.setValue(this.base64)
  this.form.get('title')?.setValue(product.title)
  this.form.get('description')?.setValue(product.description)
  this.form.get('category')?.setValue(product.category.name)

}







}
