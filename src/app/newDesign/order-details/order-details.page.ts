import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
const URL = environment.baseUrl;
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {
  data: any;
  cartItem:any=[]
  imageData: any=[];
  url: string;
  deliveryCharges: any;
  serviceCharge: any;
  tax: any;
  totalAmount: any;
  totalOrderPrice: any;
  deliveryAddress: any;
  firstname: any;
  state: any;
  city: any;
  streetAddress: any;
  pin: any;

  constructor(   private route: ActivatedRoute,  private router: Router,private auth : AuthService) { }

  ngOnInit() {

 
    this.data = this.router.getCurrentNavigation()?.extras.state;
    console.log('sssssss',this.data.orderDetails.item)
    this.cartItem = this.data.orderDetails.item
    console.log(this.cartItem);
    
  //  this.data.orderDetails.address;
    for(let i=0;i<this.data.orderDetails.address.length;i++){
      console.log(this.data.orderDetails.address[i])
      this.deliveryAddress =  this.data.orderDetails.address[i]
      console.log(this.deliveryAddress.firstname)
      this.firstname = this.deliveryAddress.firstname
      this.state = this.deliveryAddress.state;
      this.city = this.deliveryAddress.city;
      this.streetAddress= this.deliveryAddress.streetAddress;
      this.pin = this.deliveryAddress.pin;
    }

    this.deliveryCharges = this.data.orderDetails.deliveryCharge;
    console.log(this.deliveryCharges)
    this.serviceCharge = this.data.orderDetails.serviceCharge;
    this.tax = this.data.orderDetails.tax;
    this.totalAmount = this.data.orderDetails.totalAmount;
    this.totalOrderPrice = this.data.orderDetails.totalPrice;
    // console.log('dataaaa',this.data.orderDetails.orderDetails);
    for(let i = 0;i<this.cartItem.length;i++){
      // console.log(this.cartItem[i].imagePath)
      this.imageData.push(this.cartItem[i].imagePath);
      console.log(this.imageData)

      this.url = URL;
      // console.log(this.url+this.imageData)
    }
   console.log(this.imageData);
   
  }

}
