import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  products: any[] = [];
  searchProductForm! : FormGroup;


  constructor(private adminService: AdminService , 
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
    this.adminService.getAllProducts().subscribe(res =>{
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
    this.adminService.getAllProductsByName(title).subscribe(res =>{
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImage;
        this.products.push(element);
      });
    })
    console.log(this.products)
  }

  deleteProduct(productId: any){
    this.adminService.deleteProduct(productId).subscribe(res=> {
      if(res.body == null){
        this.snackbar.open('Product Deleted Successfully!' , 'Close', {duration: 5000});
        this.getAllProducts();
      }else{
        this.snackbar.open(res.message , 'Close', {duration: 5000 , panelClass: 'error-snackbar'});
        
      }
    })
  }

}
