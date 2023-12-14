import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm! : FormGroup;


  constructor(private customerService: CustomerService , 
    private formBuilder : FormBuilder,
    private snackbar : MatSnackBar ){}

  ngOnInit(){
    this.getAllProducts();
    this.searchProductForm = this.formBuilder.group({
      title: [null , [Validators.required]]
    })
  }

  getAllProducts(){
    this.products = [];
    this.customerService.getAllProducts().subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImage;
        this.products.push(element);
      });
      console.log(this.products)
    })
  }

  submitForm(){
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.customerService.getAllProductsByName(title).subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImage;
        this.products.push(element);
      });
    })
    console.log(this.products)
  }

  addToCart(id : any){
    
  }

}
