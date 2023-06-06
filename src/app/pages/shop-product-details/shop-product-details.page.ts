import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, ModalController, NavController, ToastController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
import { ShopProductService } from 'src/app/services/shop-product/shop-product.service';
import { CartComponent } from '../cart/cart.component';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Location } from "@angular/common";
const URL = environment.baseUrl;
@Component({
  selector: 'app-shop-product-details',
  templateUrl: './shop-product-details.page.html',
  styleUrls: ['./shop-product-details.page.scss'],
})
export class ShopProductDetailsPage implements OnInit {
  productData: any;
  filtered:any
  dataaa:any
  search: any;
  filterKeys = ['name','discription'];
  showFooter = false;
  showRemove = false;
  errorMessage: any;
  message: any;
  su_id: any;
  latlng: any;
  itemId: [];
  itemData = [];
  orderData: any;
  itemCount: any;
  phoneNo: any;
  count = 0;
  subscription: Subscription;
  number: any;
  cartItemCount: any=[];
  cart = [];
  newImage: any;
  imageData: any;
  thumbnail: any;
  url: any;
  addtocart:boolean=true;
  shopLocation: any;
  categoryName: any
  visibleIndex = -1;
  indexArray: any[]= [];
  paramsData: any;
  itemArray: any = [];
  totalInCart: number= 0;
  constructor(private route: ActivatedRoute, private shopProduct: ShopProductService,private location: Location,public navCtrl: NavController,
    private toastCtrl: ToastController,
    public router : Router, 
    private cartService: CartService, private modalCtrl: ModalController, private sanitizer: DomSanitizer) {
    }

    ngDoCheck(){
      this.cart = this.cartService.getCart() || [];
      this.totalInCart = this.cartService.getCartItemCount();


    }
  ngOnInit() {
    
    // this.myBackButton();
    //this.cart = this.cartService.getCart() || [];
   
    
    this.cartItemCount = 7;// this.cartService.getCartItemCount();
    this.itemCount = this.cartItemCount;
    console.log(this.itemCount._value);
    
    this.route.queryParams.subscribe(params => {
      if (params) {
        console.log(params);
        console.log(params.latlng);
        this.su_id=params.shopUser_id;
        this.latlng=params.latlng;
        this.shopLocation=params.shopLocation
        this.categoryName = params.category_name
        
        

        this.shopProduct.getShopProductById(params.shopUser_id, params.shop_id,).subscribe({
    
          next: data => {
            this.url = URL;
            
            
            // this.imageData = data
            // for (let i = 0; i < data.length; i++) {
            //   this.newImage = this.imageData[i].image.data
            //   this.thumbnail = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.newImage);
           
            // }
            this.productData = data;
            this.filtered = this.productData.filter(element=> {
              return element.description == this.categoryName;

            })
            console.log(this.filtered)  
            // this.productData.push(filtered)
            // console.log(this.productData)
            // for(let i =0;i<this.productData.length;i++){
            //   if(this.productData[i].description=='Fruits'){
            //     this.dataaa.push(this.productData[i].description)
            //     console.log(this.dataaa)
            //   }
            // }
          }
        });
      }
    });
  }

  // myBackButton(){
  //   console.log('lllll')
  //   this.router.navigate(['home2'])
  //   // this.location.back();
  // }
  is_in_cart(product,i){    
   let is_in_cart = false;
   this.cart =  JSON.parse(localStorage.getItem('cartData'));
   
    
    if(this.cart !=null){
      for (let p of this.cart) {
        if (p._id === product._id) {
          is_in_cart = true;
          break;
        }
      }
    }
    return is_in_cart;
  }

  onAdd(item: any,i:any){
    console.log("cartData",JSON.parse(localStorage.getItem('cartData')));
    console.log("item",item);
    this.presentToast('Product added to cart successfully','success')
   
    this.itemId = item._id;
    this.itemData.push(this.itemId);
    console.log(this.itemData);
    item.original_price = item.price
    this.showFooter= true;
    this.showRemove = true;
   // this.cart.push(item)
    // console.log('vvvvvvvvvvvv',this.cart)
    this.cartService.addProduct(item);
   // this.itemArray.push(item)
    // this.animateCSS('tada');
  }

  // async presentAlert() {
  //   const alert = await this.alertController.create({
  //     header: 'Confirm Order',
  //     subHeader: this.errorMessage,
  //     message: this.errorMessage,
  //     buttons: [{
  //       text: 'Cancel',
  //       role: 'cancel',
  //       handler: () => {
  //       }
  //     },{
  //       text: 'Add',
  //       handler: (alertData) => { //takes the data
  //         let name = alertData.name; let phone = alertData.phone;
  //         this.phoneNo = alertData.phone;
  //         this.orderService.createOrder(name, phone, this.latlng, this.itemData, this.su_id).subscribe({
  //           next: data => {
  //             console.log(data);
  //             this.orderData = data;
  //             this.message = data.message;
  //             this.presentToast();
  //             this.showFooter = false;
  //           }
  //         })
  //       }
  //     }],
  //     inputs: [{
  //       name: 'name',
  //       placeholder: 'Enter your name',
  //     },
  //     {
  //       name: 'phone',
  //       type: 'number',
  //       placeholder: 'Enter your mobile no.',
  //     }
  //   ],
  //   });

  //   await alert.present();
  // }

  async presentToast(message:any,color:any) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'top',
      color:color
    });

    await toast.present();
  }


  // onProceed(){
  //   this.presentAlert();
  // }

  // async onGotoCart(){
  //   console.log(this.cart);
  //   console.log(this.itemData)
 
  //   // const params: NavigationExtras = {
  //   //   queryParams: { id: this.itemData}
  //   // }
  //   // this.router.navigate(['/cart'], params);
  //   let modal = await this.modalCtrl.create({
  //     component: CartComponent,
  //     cssClass: 'cart-modal',
  //     componentProps: {
  //       itemData: this.itemData,
  //       latlng: this.latlng,
  //       su_id: this.su_id,
  //       itemCount: this.itemCount,
  //       shopLocation:this.shopLocation
  //     }
  //   });
  //   modal.onWillDismiss().then(() => {
  //     // this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
  //     // this.animateCSS('bounceInLeft');
  //   });
  //   modal.present();
  // }




  async onGotoCart(){
    console.log(this.itemData)

    // console.log(this.cart);
    // console.log(this.itemCount._value)
    const params: NavigationExtras = {
      queryParams: {  
          itemData: this.itemData,
            latlng: this.latlng,
            su_id: this.su_id,
            itemCount: this.itemCount._value,
            shopLocation:this.shopLocation,
      }
    }
    // this.paramsData.itemData = this.itemData,
    // this.paramsData.latlng= this.latlng,
    // this.paramsData.itemCount = this.itemCount._value,
    // this.paramsData.su_id = this.su_id,
    // this.paramsData.shopLocation = this.shopLocation
    this.router.navigate(['add-cart'],params);
  }

  onCancel(){
    this.showFooter = false;
    this.count = 0;
    this.number = '';
    this.cartItemCount.next(0);
  }

  // animateCSS(animationName, keepAnimated = false) {
  //   const node = this.fab.nativeElement;
  //   node.classList.add('animated', animationName)

  //   //https://github.com/daneden/animate.css
  //   function handleAnimationEnd() {
  //     if (!keepAnimated) {
  //       node.classList.remove('animated', animationName);
  //     }
  //     node.removeEventListener('animationend', handleAnimationEnd)
  //   }
  //   node.addEventListener('animationend', handleAnimationEnd)
  // }

}
