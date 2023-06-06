import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.page.html',
  styleUrls: ['./home1.page.scss'],
})
export class Home1Page implements OnInit {

  constructor(private router:Router,private loadingController:LoadingController) { 
    this.presentLoading()
  }

  ngOnInit() {
  }
go1(){
  this.presentLoading()
  this.router.navigateByUrl('/register1').then(() => {
    
  });
  
}
go2(){
  this.presentLoading()

  this.router.navigateByUrl('/register2').then(() => {
    
  });
}
go3(){
  this.presentLoading()
  this.router.navigateByUrl('/login1').then(() => {
    
  });
}
async presentLoading() {
  const loading = await this.loadingController.create({
    message: 'Plesae wait',
    duration: 200,
    showBackdrop:true,
    cssClass:"loading"
  });
  loading.present();
}

}
