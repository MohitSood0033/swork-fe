// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-register2',
//   templateUrl: './register2.page.html',
//   styleUrls: ['./register2.page.scss'],
// })
// export class Register2Page implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { IonSearchbar, ActionSheetController, ToastController, Platform, LoadingController, AlertController } from '@ionic/angular';
import { IonicSelectableComponent } from 'ionic-selectable';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FcmService } from 'src/app/services/fcm/fcm.service';
import { PhotoService } from 'src/app/services/photo/photo.service';
import { ServiceService } from 'src/app/services/service/service.service';
import { ShopService } from 'src/app/services/shop/shop.service';
declare var google
class ServiceData {
  public _id: string;
  public name: string;
}
 @Component({
  selector: 'app-register2',
  templateUrl: './register2.page.html',
  styleUrls: ['./register2.page.scss'],
})
export class Register2Page implements OnInit {
//   @ViewChild('autocomplete') autocomplete: IonSearchbar;

//   isSubmitted = false;
//   registerForm!: FormGroup;
//   location: [];
//   isSuccessful = false;
//   isSignUpFailed = false;
//   errorMessage = '';
//   serviceData: any;
//   photos: any;
//   data: any;
//   categoryVal: any;
//   label = 'Choose Category';
//   fcmToken: any;

//   constructor(private authService: AuthService, private router: Router, private toastCtrl: ToastController,
//     public photoService: PhotoService, private shop: ShopService, public formBuilder: FormBuilder,
//     public actionSheetController: ActionSheetController, private fcmService: FcmService) { }

//   ngOnInit() {
//     // this.loadPhotos();
//     this.createForm();
//     this.fcmService.getNewUserInfo().subscribe(token => {
//       this.fcmToken = token;
//     })
//   }


//   createForm() {
//     this.registerForm = this.formBuilder.group({
//       phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
//       password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
//       firstname: ['', [Validators.required]],
//       lastname: ['', [Validators.required]],
//       email: [''],
//       rephone: ['', [Validators.pattern('^[0-9]+$')]],
//       location: ['', [Validators.required]],
//       geo_address: ['', [Validators.required]],
//     });
//   }

//   get f() {
//     return this.registerForm.controls;
//   }


 

//   ionViewDidEnter() {
//     this.autocomplete.getInputElement().then((ref => {
//       const autocomplete = new google.maps.places.Autocomplete(ref);
//       autocomplete.addListener('place_changed', () => {
//         let response = autocomplete.getPlace();

//         console.log("respoinse----------", response.formatted_address);


//         // this.location.coordinates.push.apply(response.geometry['location'].lat(),response.geometry['location'].lng())


//         this.registerForm.patchValue({
//           location: [response.geometry['location'].lat(), response.geometry['location'].lng()],
//           geo_address: response.formatted_address
//         })
//         console.log(this.registerForm.get("location")?.value);


//         //     this.form.location = this.location;
//         //console.log(this.location);

//         //     this.form.location = this.location;

//       })
//     }))
//   }

//   async presentToast(text: any) {
//     const toast = await this.toastCtrl.create({
//       message: text,
//       duration: 1500
//     });
//     toast.present();
//   }

//   async onSubmit() {
//     //  await  this.loadPhotos()
//     console.log(this.registerForm.value);
//     console.log(this.categoryVal);

//     this.isSubmitted = true
//     if (!this.registerForm.valid) {
//       console.log('Please provide all the required values!')
//       return false
//     }

//     // return
//     // const { phone, firstname, lastname, email, rephone, password, location, service ,geo_address} = this.form;
//     this.authService.registerCustomer(this.registerForm.get('phone')?.value, this.registerForm.get('password')?.value,
//       this.registerForm.get('firstname')?.value, this.registerForm.get('lastname')?.value, this.registerForm.get('email')?.value,
//       this.registerForm.get('rephone')?.value, this.registerForm.get('location')?.value,
//       this.registerForm.get('geo_address')?.value,this.fcmToken).subscribe({
//         next: data => {
//           console.log(data);
//           this.isSubmitted = true;
//           this.presentToast(data.message);
//           this.router.navigate(['/customer-login'])
//         },
//         error: err => {
//           this.errorMessage = err.error.message;
//           this.presentToast(err.error.message);
//           this.isSubmitted = false
//           this.router.navigate(['/customer-login'])
//         }
//       });
//   }
// }

//////////////////////////

 @ViewChild('autocomplete') autocomplete: IonSearchbar;
  // ports: Port[];
  // port: Port;
  isSubmitted = false;
  registerForm!: FormGroup;
  location: [];
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  serviceData: ServiceData[];
  services:ServiceData;
  photos: any;
  data: any;
  categoryVal: any;
  label = 'Choose Category';
  fcmToken: any;
  handlerMessage: string='';
  roleMessage: string;
  isSelected=false
  selectedvalue=[]
  constructor(private authService: AuthService, private router: Router, private service: ServiceService,
    public photoService: PhotoService, private shop: ShopService, public formBuilder: FormBuilder,
    public actionSheetController: ActionSheetController, private plt: Platform, private loadingCtrl: LoadingController,private alertController:AlertController,

    private toastCtrl: ToastController, private fcmService: FcmService,
    private http: HttpClient,) {
      // this.ports = [
      //   { id: 1, name: 'Tokai' },
      //   { id: 2, name: 'Vladivostok' },
      //   { id: 3, name: 'Navlakhi' }
      // ];
     }

  ngOnInit() {
    const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
    if (isPushNotificationsAvailable) {
      this.initPushNotifications();
    }
    this.createForm();
  }
  initPushNotifications() {
    this.fcmService.getNewUserInfo().subscribe(token => {
      this.fcmToken = token;
    })
  }


  createForm() {
    this.registerForm = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: [''],
      rephone: ['', [Validators.pattern('^[0-9]+$')]],
      location: ['', [Validators.required]],
      service: ['',],
      geo_address: ['', [Validators.required]],
      camera: [this.photoService.photos],
      discription: ['']
    });
  }

  get f() {
    return this.registerForm.controls;
  }
  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }
  ionViewDidEnter() {
    this.autocomplete.getInputElement().then((ref => {
      const autocomplete = new google.maps.places.Autocomplete(ref);
      autocomplete.addListener('place_changed', () => {
        let response = autocomplete.getPlace();

        console.log("respoinse----------", response.formatted_address);

        this.registerForm.patchValue({
          location: [response.geometry['location'].lat(), response.geometry['location'].lng()],
          geo_address: response.formatted_address
        })
        console.log(this.registerForm.get("location")?.value);
      })
    }))
  }

  onClick(value: any) {
    this.selectedvalue=[]
    console.log(value)
this.isSelected=true

    this.categoryVal = value

    if (this.categoryVal == 'services') {
      this.label = "Choose Service";
      return this.service.services().subscribe({
        next: data => {
          this.serviceData = data.data
          console.log(this.serviceData)
        }
      })
    }

    if (this.categoryVal == 'shops') {
      this.label = "Choose Shop";
      return this.shop.shops().subscribe({
        next: data => {
          this.serviceData = data.data
          console.log(this.serviceData)
        }
      })
    }
  }

  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Do you want delivery Bag!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'no';
          },
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'yes';
            this.sendParam()

          },
        },
      ],
    });

    await alert.present();
  }
  

  sendParam(){
    this.categoryVal='shops'
    this.selectedvalue=['632f20a2f5b9eadf0ff16a1a']
    // for(let item of this.registerForm.get('service')?.value){
    //   this.selectedvalue.push(item._id)
    // }
    console.log(this.selectedvalue);
    
    const params: NavigationExtras = {
      queryParams: {
        discription: this.registerForm.get('discription')?.value,
        phone: this.registerForm.get('phone')?.value, password: this.registerForm.get('password')?.value,
        firstname: this.registerForm.get('firstname')?.value, lastname: this.registerForm.get('lastname')?.value,
        email: this.registerForm.get('email')?.value, rephone: this.registerForm.get('rephone')?.value,
        service: this.selectedvalue, location: this.registerForm.get('location')?.value,
        geo_address: this.registerForm.get('geo_address')?.value, categoryVal: this.categoryVal,
        fcmToken: this.fcmToken,needDelBag:this.handlerMessage
      },
    };

    this.router.navigate(['ionic-image'], params);
  }
  async onSubmit() {
    console.log(this.registerForm.get('service')?.value);
    
    this.isSubmitted = true;
    if (!this.registerForm.valid) {
      console.log('Please provide all the required values!')
      return false
    }
    // 634d13301ff749682b279f4b
    // console.log(this.registerForm.get('phone')?.value);
    let isDeleveryBoy=['632f20a2f5b9eadf0ff16a1a'].find((x: string) => x== '634d13301ff749682b279f4b')
if(isDeleveryBoy){
 await this.presentAlert()
}else{
  this.handlerMessage=''
 this.sendParam()
}


// return
  
    // this.isSubmitted = true
    // if (!this.registerForm.valid) {
    //   console.log('Please provide all the required values!')
    //   return false
    // }
    // if (this.categoryVal == 'services') {
    //   // const { phone, firstname, lastname, email, rephone, password, location, service,geo_address} = this.form;
    //   this.authService.register(this.registerForm.get('phone')?.value, this.registerForm.get('password')?.value,
    //     this.registerForm.get('firstname')?.value, this.registerForm.get('lastname')?.value, this.registerForm.get('email')?.value,
    //     this.registerForm.get('rephone')?.value, this.registerForm.get('service')?.value, this.registerForm.get('location')?.value,
    //     this.registerForm.get('discription')?.value,this.registerForm.get('geo_address')?.value,).subscribe({
    //       next: data => {
    //         console.log(data);
    //         this.isSubmitted = true
    //         this.router.navigate(['/login'])
    //       },
    //       error: err => {
    //         this.errorMessage = err.error.message;
    //         this.isSubmitted = false;
    //       }
    //     });
    // }

    // if (this.categoryVal == 'shops') {

    //   // const { phone, firstname, lastname, email, rephone, password, location, service ,geo_address} = this.form;
    //   this.authService.shopUserRegister(this.registerForm.get('phone')?.value, this.registerForm.get('password')?.value,
    //     this.registerForm.get('firstname')?.value, this.registerForm.get('lastname')?.value, this.registerForm.get('email')?.value,
    //     this.registerForm.get('rephone')?.value, this.registerForm.get('service')?.value, this.registerForm.get('location')?.value,
    //     this.registerForm.get('discription')?.value,this.registerForm.get('geo_address')?.value,).subscribe({
    //       next: data => {
    //         console.log(data);
    //         this.isSubmitted = true

    //         this.router.navigate(['/shop-login'])
    //       },
    //       error: err => {
    //         this.errorMessage = err.error.message;
    //         this.isSubmitted = false

    //       }
    //     });
    // }
  }
}
