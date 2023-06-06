import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ShopProductService } from 'src/app/services/shop-product/shop-product.service';
import { environment } from 'src/environments/environment';
const URL = environment.baseUrl;
declare const google

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.page.html',
  styleUrls: ['./add-cart.page.scss'],
})
export class AddCartPage implements OnInit {

  orderData: any;
  errorMessage: any;
  message: any;
  su_id: any;
  itemData = [];
  latlng: any;
  phoneNo: any;
  itemCount: any;
  itemName = [];
  item = [];
  totalValue: any;
  original_price: any;
  orderItemPrice: any;
  customerData: any;
  shopLocation: any
  OrderDistance: any;
  deliveryCharge: any = 0;
  selValue: any;
  selectedValues: any;
  data: any;
  url: any;
  imageData: any;
  constructor(private http: HttpClient, private auth: AuthService, private router: Router, private shopProduct: ShopProductService,
    private orderService: OrderService, private toastCtrl: ToastController, private cartService: CartService,
    private modalCtrl: ModalController, private alertCtrl: AlertController, private route: ActivatedRoute) {

  }

  cart: any = [];

  ngOnInit() {
    console.log(this.customerData)
  
    // this.data = this.router.getCurrentNavigation()?.extras.state;
    // console.log('dataaaa', this.data);
    // for(let i=0;i<this.data.cart.length;i++){
    //   this.cart.push(this.data.cart[i])
    // }
  
    this.route.queryParams.subscribe(params => {
      console.log(params)
      if (params) {
        console.log('add cart params', params)
        console.log(params.latlng)
        this.latlng = params.latlng
        console.log(params.shopLocation)
        this.shopLocation = params.shopLocation
        this.su_id = params.su_id;
        console.log(params.su_id)
      }
    })

    // this.cart = this.cartService.getCart();
   this.cart = JSON.parse(localStorage.getItem('cartData'))
    console.log(this.cart);
    for (let i = 0; i < this.cart.length; i++) {
      this.itemName = this.cart[i];
      this.item.push(this.itemName);
      this.imageData = this.cart[i].imagePath;
      // console.log(this.imageData)

      this.url = URL;
      // console.log(this.url+this.imageData)
      // this.imageData = data.getEmployee.imagePath;
      // console.log(this.imageData);
    }

    console.log(this.item);
    this.auth.getCustomer().subscribe({
      next: (data) => {
        console.log(data);
        this.customerData = data.getCustomer;
        console.log('dfdfdfdf',this.customerData)
      },
    });

    this.auth.getuser().subscribe({
      next: (data) => {
        console.log(data);
        this.customerData = data.getUser;
      },
    });
    this.auth.getShopuser().subscribe({
      next: (data) => {
        console.log(data);
        this.customerData = data.getUser;
        console.log('aaaaaaaaaaaaaaaaa',this.customerData)
      },
    });
console.log('22222222222222',this.customerData)
  }


  // getDistance(shopLocation: any, customerLocation: any) {
  //   const matrix = new google.maps.DistanceMatrixService();
  //   return new Promise((resolve, reject) => {
  //     matrix.getDistanceMatrix({
  //       origins: [new google.maps.LatLng(shopLocation[0], shopLocation[1])],
  //       destinations: [new google.maps.LatLng(customerLocation[0], customerLocation[1])],
  //       travelMode: google.maps.TravelMode.DRIVING,
  //     }, (response: any, status: any) => {
  //       if (status === 'OK') {
  //         this.OrderDistance = response.rows[0].elements[0].distance.value

  //         resolve(response)

  //       } else {
  //         reject(response);
  //       }
  //     });
  //   })
  // }
  decreaseCartItem(product: any, i: any) {
    this.cart[i].amount = (this.cart[i].amount - 1);
    this.cart[i].price = (this.cart[i].basePrice * this.cart[i].amount);
  }

  increaseCartItem(product: any, i: any) {

    this.cart[i].amount = (this.cart[i].amount + 1);
    this.cart[i].price = (this.cart[i].basePrice * this.cart[i].amount);
    this.orderItemPrice = this.cart[i].price;
    console.log(this.orderItemPrice);

  }

  removeCartItem(product: any) {
    this.cartService.removeProduct(product);
    console.log(this.itemCount)
    this.cart = JSON.parse(localStorage.getItem('cartData'));

  }

  deleviryType(selVal: number) {
    this.selValue = selVal
    if (this.selValue == '0') {
      this.deliveryCharge = 0
    } else {
      this.deliveryCharge = 50

    }
  }

  getTotal() {
    return this.totalValue = this.cart.reduce((i, j) => i + j.basePrice * j.amount, 0) + this.deliveryCharge;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  async checkout() {
    // this.getDistance(this.shopLocation, this.customerData.location.coordinates)

    // Perfom PayPal or Stripe checkout process

    // let alert = await this.alertCtrl.create({
    //   header: 'Thanks for your Order!',
    //   message: 'We will deliver your product as soon as possible',
    //   buttons: ['OK']
    // });
    // alert.present().then(() => {
    //   this.modalCtrl.dismiss();
    // });
    console.log(this.cartService.getCart());


    console.log('cccccccccccccccccc', this.customerData)
    console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiii', this.item);
    // console.log(this.orderItemPrice, this.itemCount._value,)
    console.log(this.orderItemPrice, this.cart.length,)

    console.log(this.latlng)
    console.log('itemmdata', this.itemData, this.su_id)


    this.customerData.items = this.item
    this.customerData.totalvalue = this.totalValue
    this.customerData.orderItemPrice = this.orderItemPrice
    this.customerData.itemCountvalue = this.cart.length
    this.customerData.latlng = this.latlng
    this.customerData.itemData = this.itemData
    this.customerData.su_id = this.su_id
    this.customerData.deliveryCharges = this.deliveryCharge

    let orderDetails = this.customerData;
    this.modalCtrl.dismiss();

    this.router.navigate(['/make-payment'], { state: { orderDetails } });



    // const params: NavigationExtras = {
    //   queryParams: { phone : this.customerData.phone,address :this.customerData.geo_address, totalValue: this.totalValue,  orderDistance: this.OrderDistance, customerName: this.customerData.firstname + " " + this.customerData.lastname, customerEmail: this.customerData.email,deliveryCharge: this.deliveryCharge ,
    // item : this.item , orderItemPrice: this.orderItemPrice,itemCount :this.itemCount._value, latlng: this.latlng,itemData : this.itemData , su_Id: this.su_id},
    // };

    // this.router.navigate(['/make-payment'], params)
    // for (let i = 0; i < this.item.length; i++) {
    //   delete this.item[i].image
    // }
    // console.log('itemm',this.item)

    // let name = this.customerData.firstname; let phone = this.customerData.phone; let address = this.customerData.geo_address; let email = this.customerData.email;
    // this.orderService.createOrder(name, phone, email, this.item, this.orderItemPrice, this.totalValue, this.itemCount._value, address,
    //   this.latlng, this.itemData, this.su_id).subscribe({
    //     next: data => { 
    //       console.log(data.productOrder._id);
    //       this.orderData = data;
    //       this.message = data.message;
    //       this.presentToast();
    //       this.modalCtrl.dismiss();

    //       const params: NavigationExtras = {
    //         queryParams: { phone : this.customerData.phone,address :this.customerData.geo_address, totalValue: this.totalValue, id: data.productOrder._id, orderDistance: this.OrderDistance, customerName: this.customerData.firstname + " " + this.customerData.lastname, customerEmail: this.customerData.email,deliveryCharge: this.deliveryCharge ,
    //       item : this.item , orderItemPrice: this.orderItemPrice,itemCount :this.itemCount._value, latlng: this.latlng, itemData : this.itemData , su_Id: this.su_id},
    //       };

    //       this.router.navigate(['/make-payment'], params)
    //     }
    //   })

    // this.presentAlert();



  }
 

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Order',
      subHeader: this.errorMessage,
      message: this.errorMessage,
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
        }
      }, {
        text: 'Make Payment',
        handler: (alertData) => { //takes the data
          console.log('alertdata', alertData)
          console.log('iiiiiiiiiiiiiiiiiiiiiiiiiiiii', this.item);
          for (let i = 0; i < this.item.length; i++) {
            delete this.item[i].image
          }

          let name = alertData.name; let phone = alertData.phone; let address = alertData.address; let email = alertData.email;
          // this.orderService.createOrder(name, phone, email, this.item, this.orderItemPrice, this.totalValue, this.itemCount._value, address,
          //   this.latlng, this.itemData, this.su_id).subscribe({
          //     next: data => {
          //       console.log(data.productOrder._id);
          //       this.orderData = data;
          //       this.message = data.message;
          //       this.presentToast();
          //       this.modalCtrl.dismiss();
          //       const params: NavigationExtras = {
          //         queryParams: { totalValue: this.totalValue, id: data.productOrder._id, orderDistance: this.OrderDistance, customerName: this.customerData.firstname + " " + this.customerData.lastname, customerEmail: this.customerData.email,deliveryCharge: this.deliveryCharge },
          //       };

          //       this.router.navigate(['/make-payment'], params)
          //     }
          //   })
        }
      }],
      inputs: [{
        name: 'name',
        placeholder: 'Enter your name',
        value: this.customerData.firstname + " " + this.customerData.lastname
      },
      {
        name: 'email',
        placeholder: 'Enter your Email',
        value: this.customerData.email
      },
      {
        name: 'phone',
        type: 'number',
        placeholder: 'Enter your mobile no.',
        value: this.customerData.phone
      },
      {
        name: 'address',
        type: 'text',
        placeholder: 'Enter your address',
        value: this.customerData.geo_address
      }
      ],
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: this.message,
      duration: 1500,
      position: 'top'
    });

    await toast.present();
  }


}
