// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-customer-profile',
//   templateUrl: './customer-profile.page.html',
//   styleUrls: ['./customer-profile.page.scss'],
// })
// export class CustomerProfilePage implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationExtras, Router } from '@angular/router';
import { App } from '@capacitor/app';
import { Platform, IonRouterOutlet, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PaymentService } from 'src/app/services/payment/payment.service';
import { TokenStorageService } from 'src/app/services/token/token.service';
import { environment } from 'src/environments/environment';
const URL = environment.baseUrl;
@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.page.html',
  styleUrls: ['./customer-profile.page.scss'],
})
export class CustomerProfilePage implements OnInit {
  user: any;
  firstName: any;
  lastName: any;
  phone: any;
  rephone: any;
  geo_address: any;
  email: any;
  status: any;
  ServiceName: any;
  startDate: any
  endMonth:any
  showPayment: boolean = true
  showPlan: boolean = false
  endYear:any
  endDate:any
  imageData: any;
  thumbnail: any;
  newImage: any;
  isToggled: true;
  message: any;
  avalStatus: any;
  url: any;
  constructor(private auth: AuthService, private router: Router, private payment: PaymentService,
    private tokenStorage: TokenStorageService, private platform: Platform, private http: HttpClient,
    private sanitizer: DomSanitizer, private toastController: ToastController,
    @Optional() private routerOutlet?: IonRouterOutlet) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (this.routerOutlet.canGoBack()) {
        this.router.navigateByUrl('/home2').then(() => {
          // window.location.reload();
          history.go(0);
        });
      }
    }); 
  this.isToggled = true;
}
  ngOnInit() {
    this.auth.getCustomer().subscribe({
      next: data => {
        console.log(data)
        this.url = URL;
        // this.imageData = data.getUser.imagePath
        this.user = data.getCustomer
        this.firstName = this.user.firstname;
        this.lastName = this.user.lastname;
        this.phone = this.user.phone;
        this.rephone = this.user.rephone;
        this.geo_address = this.user.geo_address;
        this.email = this.user.email;
      
    
      }
    })

  }
  goBack(){
    this.router.navigateByUrl('/home2').then(() => {
      window.location.reload();
    });
  }

  signOut() {
    this.tokenStorage.signOut();
    this.presentToast('success','You have successfully logged out')
    this.router.navigateByUrl('/home2').then(() => {
      // window.location.reload();
    });
  }

  async presentToast(color:any,message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: color,
    });

    await toast.present();
  }

  orderRequest(){
    const params: NavigationExtras = {
      queryParams: { url: this.router.url },
    };
    this.router.navigate(['/delivery-request'],params)
  }

}


