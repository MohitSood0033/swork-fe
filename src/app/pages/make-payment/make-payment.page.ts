import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { environment } from 'src/environments/environment';
import {
  Stripe,
  PaymentSheetEventsEnum,
  ApplePayEventsEnum,
} from '@capacitor-community/stripe';
import { first, lastValueFrom } from 'rxjs';
import { OrderService } from 'src/app/services/order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DeliveryAdressService } from 'src/app/services/DelivertAddress/delivery-adress.service';

const AUTH_API = environment.baseUrl;
// let publishableKey='pk_test_51Mc4HxSInjEP45qtz9nVO5tvHHnVHs2KBFU77HSSpf2EWy4eBbjiiwqZUlb4UwOSRdMPxzrmLFDP7wMBtvVO5prr00hHaG8FWn'
declare var Razorpay: any;

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.page.html',
  styleUrls: ['./make-payment.page.scss'],
})
export class MakePaymentPage implements OnInit {
  @ViewChild('radio') radio!: ElementRef<any>;
  paymentStatus: any;
  status: 2;
  usertype: string = 'shop';
  price: any;
  phone:any;
  totalAmt: any;
  item:any;
  orderItemPrice:any;
  address:any;
  email:any
  tax = 10;
  locationCoordinates :any
  itemCount:any;
  serviceCharge = 10;
  deliveryCharge: any;
  orderId: any;
  orderDistance: any;
  itemData:any;
  su_id:any;
  selectedAddress:any;
  key: any;
  data: any = {
    name: '',
    email: '',
    amount: '',
    currency: 'INR',
  };
  customerName: any;
  customerEmail: any;
  selectedRadioGroup: any;

  btnTypelist = [
    {
      btnType: 'Add New Address',
    }]
    createAddressbtn = false;
    placeOrdebtn = false;

  existingAddressbtn = true;
  deliveryAddress:any;
  createAddress:FormGroup;
  isSubmitted:false
  customerData: any;
  customerId: any;
  selectedRadioItem: any;
  public addressId: any ;
  selected: any;
  cu_id: any;
  constructor(
    private location: Location,
    private http: HttpClient,
    private alertController: AlertController,
    private paymentHistory: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private fb : FormBuilder,
    private auth: AuthService,
    private deliveryAddressService : DeliveryAdressService
    
  ) {
    console.log(this.key);
  }

  async ngOnInit() {
    this.data = this.router.getCurrentNavigation()?.extras.state;
    console.log('dataaaa',this.data.orderDetails);
    this.cu_id = this.data.orderDetails._id;
    console.log('customer idd',this.cu_id)
    this.price = this.data.orderDetails.totalvalue;
    this.itemCount = this.data.orderDetails.itemCountvalue;
    console.log(this.price)
    this.phone = this.data.orderDetails.phone;
    this.email = this.data.orderDetails.email
    this.item = this.data.orderDetails.items;
    this.orderItemPrice = this.data.orderDetails.orderItemPrice;
   this.address = this.data.orderDetails.geo_address;
    this.customerName = this.data.orderDetails.firstname +" "+this.data.orderDetails.lastname;
    this.customerEmail = this.data.orderDetails.email;
    this.deliveryCharge =  this.data.orderDetails.deliveryCharges
    console.log(this.deliveryCharge)
    this.locationCoordinates = this.data.orderDetails.latlng;
    this.itemData = this.data.orderDetails.itemData;
    this.su_id = this.data.orderDetails.su_id;
    // this.route.queryParams.subscribe((params) => {
    //   console.log(params);
    //   if (params) {
    //     this.price = parseInt(params.totalValue);
    //     this.orderId = params.id;
    //     this.orderDistance = params.orderDistance;
    //     this.customerName = params.customerName;
    //     this.customerEmail = params.customerEmail;
    //     this.deliveryCharge =  parseInt(params.deliveryCharge);
    //   }
    // });
    this.totalAmt = this.price + this.tax + this.serviceCharge + this.deliveryCharge;
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa',this.totalAmt);
    

    // this.paymentHistory.getChargesInformation().subscribe({
    //   next: (data) => {
    //     console.log(data);
    //     this.key = data.publishableKey;
    //     console.log(this.key);

    //     Stripe.initialize({
    //       publishableKey: this.key,
    //     });
    //     this.tax = Math.ceil((this.price * data.taxInPercent) / 100);
    //     this.serviceCharge = data.serviceCharge;
    //     // this.deliveryCharge = Math.ceil(
    //     //   (this.orderDistance * data.deliveryChargePerKm) / 1000
    //     // );
    //     this.totalAmt =
    //       this.price + this.tax + this.serviceCharge + this.deliveryCharge;
    //   },
    // });

    this.auth.getCustomer().subscribe({
      next: (data) => {
        console.log(data);
        this.customerData = data.getCustomer;
        console.log(this.customerData._id)
        this.customerId = this.customerData._id
        this.deliveryAddressService.getAddress(this.customerId).subscribe({
          next: data=>{
            console.log(data)
            this.deliveryAddress = data
            console.log(this.deliveryAddress)
            // console.log(this.radio)
            this.selected= this.deliveryAddress[0]
          
            this.addressId=this.deliveryAddress[0]._id
            console.log(this.addressId)
            this.deliveryAddressService.getSelectedAddress(this.addressId).subscribe({
              next: data=>{
                console.log(data[0])
                // this.placeOrdebtn= true;
                this.selectedAddress = data[0]
            
              }
            })
            // this.radio.nativeElement.value = this.deliveryAddress[0]

          }
        })
       
        // if (this.customerData !== null) {
        //   return (this.label = 'Customer');
        // }
      },
    });

  

    this.createAddress = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      // phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      state: ['',Validators.required],
      pin: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
    });
      
    
  }

  ngDoCheck() {
    // this.getDelieryAddress()
  }

  goBack() {
    this.location.back();
  }

  buy(plan: any) {
    console.log('rrrrrrrrrrrrrr',this.totalAmt)
    let name: any, price: any, theme: any, param: any;
    if (plan == 'basic') {
      name = 'Order Payment';
      price = `${this.totalAmt}`;
      theme = '#8F46EE';
      param = 'orderPayment';
    }

    console.log(price);

    this.http
      .post(AUTH_API + param, { totalAmount: price * 100 })
      .subscribe((res: any) => {
        console.log('wwwwwwwwwwwwwwwwwwwww',res)
        var options = {
          key: this.key,
          name: name,
          discription: 'Testing purpose',
          amount: price *100 ,
          // amount: res.amount,
          currency: 'INR',
          image: '/assets/img/s-work7-logo-11.png',
          order_id: res['id'],
          handler: (response: any) => {
            this.presentAlert();
            console.log(response);
            this.paymentStatus = response;
          },
          theme: {
            color: theme,
          },
        };
        this.initPay(options);
      });
  }

  initPay(options: any) {
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Payment Successfull!!!',
      cssClass: 'custom-alert',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          role: 'submit',
          handler: () => {
            this.paymentHistory
              .orderPaymentRecord(
                2,
                this.usertype,
                this.orderId,
                this.paymentStatus
              )
              .subscribe({
                next: (data) => {
                  console.log(data);
                  this.router.navigate(['home']);
                },
              });
          },
        },
      ],
    });

    await alert.present();
  }

  httpPost(body: any) {
    return this.http
      .post<any>(environment.baseUrl + 'payment-sheet', body)
      .pipe(first());
  }
  async paymentSheet() {
    // be able to get event of PaymentSheet
    Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
      console.log('PaymentSheetEventsEnum.Completed');
    });
    this.data = {
      name: this.customerName,
      email: this.customerEmail,
      amount: this.totalAmt * 100,
      currency: 'INR',
    };
    // Connect to your backend endpoint, and get every key.
    const data$ = this.httpPost(this.data);
    const { paymentIntent, ephemeralKey, customer } = await lastValueFrom(
      data$
    );
    // prepare PaymentSheet with CreatePaymentSheetOption.
    await Stripe.createPaymentSheet({
      paymentIntentClientSecret: paymentIntent,
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      merchantDisplayName: 'anything',
    });

    // present PaymentSheet and get result.
    const result = await Stripe.presentPaymentSheet();
    if (result.paymentResult === PaymentSheetEventsEnum.Completed) {
      // Happy path
      console.log(paymentIntent.split('_').slice(0, 2).join('_'));

      this.presentAlert();
    }
  }

  placeOrder(){
    console.log(this.customerName)
    this.orderService.createOrder(this.customerName,this.phone,this.email,this.item,this.orderItemPrice,this.price,this.itemCount,this.serviceCharge,this.tax,this.deliveryCharge,this.totalAmt,this.selectedAddress,this.locationCoordinates,this.item,this.su_id,this.cu_id).subscribe({
      next : data=>{
console.log(data)
if(data.message=="Order add Successfully"){
  this.orderAlert()
}
      },error:err=>{
        console.log(err)
      }
    })
    console.log('place orderrr')
  }

  async orderAlert() {
    const alert = await this.alertController.create({
  
      header: 'Order Placed Successfully',
      subHeader: 'we will contact you for complete the  order',
      cssClass: 'custom-alert',
      backdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          role: 'submit',
          handler: () => {
                  this.router.navigate(['home2']);
                },
        }
      ],
    });

    await alert.present();
  }

  onclick(btn: any) {
    console.log(btn)
    if (btn === 'Add New Address') {
      this.createAddressbtn = true;
      this.existingAddressbtn = false;
      // this.existingAddressbtn = false;

    }
    if (btn.btnType === 'Use Existing Address') {
      this.existingAddressbtn = true;
      this.createAddressbtn = false;
      // this.page = 0;
      this.getDelieryAddress();
    }
  }

  save(){
    if(this.createAddress.valid){
      console.log(this.createAddress.value)
      this.deliveryAddressService.createAddress( 
        this.createAddress.get('firstname')?.value,
        this.createAddress.get('lastname')?.value,
        this.createAddress.get('streetAddress')?.value,
        this.createAddress.get('phone')?.value,
        this.createAddress.get('city')?.value,
        this.createAddress.get('state')?.value,
        this.createAddress.get('pin')?.value,
        this.customerId
        ).subscribe({
        next:data=>{
          console.log(data.customerDeliveryAddress._id)
      this.existingAddressbtn = true;
      this.createAddressbtn = false;


          this.getDelieryAddress()
          this.deliveryAddressService.getSelectedAddress(data.customerDeliveryAddress._id).subscribe({
            next: data=>{
              console.log(data)
              console.log(data[0])
       this.selectedAddress = data[0]
            }
          })
        }
      })
    }else{
      console.log("please fill add fild")
    }
  }

  getDelieryAddress(){
    this.deliveryAddressService.getAddress(this.customerId).subscribe({
      next: data=>{
        console.log(data)
        this.deliveryAddress = data
        console.log(this.deliveryAddress)
      }
    })
  }

  radioGroupChange(event: any) {
    // console.log('radioGroupChange', event.detail.value);
    this.selectedRadioGroup = event.detail;
    console.log(this.selectedRadioGroup)

  }
  radioFocus() {
    // console.log("radioFocus");
  }
  //get select payment radio value
  radioSelect(event: any) {
    console.log('radioSelect', event.detail);
    this.selectedRadioItem = event.detail;
    console.log(this.selectedRadioItem)
  }
  radioBlur() {
    // console.log("radioBlur");
  }

  address_id(address:any){
console.log(address._id)
// this.addressId = address._id
this.deliveryAddressService.getSelectedAddress(address._id).subscribe({
  next: data=>{
    console.log(data[0])
    // this.placeOrdebtn= true;
    this.selectedAddress = data[0]

  }
})
  }

  getselectedDeliveryAddress(){
    
  }
}
