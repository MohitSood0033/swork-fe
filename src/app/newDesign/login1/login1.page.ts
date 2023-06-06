// import { Component, OnInit } from '@angular/core';


// export class Login1Page implements OnInit {
//   
//   constructor() { }

//   ngOnInit() {
//   }
//   changeSelected(flag: any) {
//     this.selected = flag;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertButton, AlertController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-login1',
  templateUrl: './login1.page.html',
  styleUrls: ['./login1.page.scss'],
})
export class Login1Page implements OnInit{
  loginForm:FormGroup;
  isLoggedIn = false;
  errorMessage: any;
  showPassword=false
  passwordToggleIcon='eye'
  selected = 1;
  constructor(private toastCtrl:ToastController, public formBuilder: FormBuilder,private router:Router,private authService: AuthService,private alertController:AlertController,
    private tokenStorage: TokenStorageService) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      // phone: ['', [Validators.required,Validators.pattern('^[0-9]+$'),Validators.maxLength(10),Validators.minLength(10)]],
        phone: [
          '',
          [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
        ],
      password:['',[Validators.required,Validators.minLength(8)]],
      
    })
  }
  toggle(){
    this.showPassword=!this.showPassword
    if(this.passwordToggleIcon==='eye'){
      this.passwordToggleIcon='eye-off'
    }else{
      this.passwordToggleIcon='eye'

    }
  }
  get errorControl() {
    return this.loginForm.controls;
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: this.errorMessage,
      // message: this.errorMessage,
      buttons: ['OK'],
    });
    await alert.present();
  }
  async presentToast(message: any, color: any) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: color,
    });

    toast.present();
  }
  async onSubmit() {
 this.isLoggedIn=true
 if (!this.loginForm.valid) {
  console.log('Please provide all the required values!')
  return false;
}else{  
  // if(this.selected===1){
    this.authService.customerSignin(this.loginForm.get('phone')?.value, this.loginForm.get('password')?.value).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.token);
        this.isLoggedIn = true;
        this.router.navigate(['/customer-profile'])
        this.presentToast(data.message,'success')
        // this.reloadPage();
      },error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        this.isLoggedIn = false;
        this.presentToast(err.error.message,'danger')

      }
    })
  }
  // if(this.selected===2){
  //   this.authService.shopUserSignin(this.loginForm.get('phone')?.value, this.loginForm.get('password')?.value).subscribe({
  //     next: data => {
  //       this.tokenStorage.saveToken(data.token);
  //       this.isLoggedIn = true;
  //       this.router.navigate(['/shop-user-profile'])
  //       this.presentToast(data.message,'success')
  //       // this.reloadPage();
  //     },error: err => {
  //       this.errorMessage = err.error.message;
  //       console.log(this.errorMessage);
  //       this.isLoggedIn = false;
  //       this.presentToast(err.error.message,'danger')

  //     }
  //   })
  //   return
  // }
   
  }
  
  
  reloadPage(): void {
    window.location.reload();
  }
  changeSelected(flag: any) {
        this.selected = flag;
      }

}
