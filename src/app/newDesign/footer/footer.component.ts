import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Home2Page } from '../home2/home2.page';
import { CustomerProfilePage } from '../customer-profile/customer-profile.page';
import { OrderComponent } from 'src/app/pages/order/order.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  tab1Root = Home2Page;
  tab2Root = CustomerProfilePage;
  tab3Root = OrderComponent;
  public segment: string= '/home2';
  public currentRoute : any;
  constructor(private router : Router) { }

  ngOnInit() {
    console.log(this.router.url)
    this.currentRoute = this.router.url;

  }

  segmentChanged(ev: any) {
    console.log(this.router.url)
    // console.log('wwwwwwwww',this.router)
    console.log(ev)
    // if(this.router.url === '/home2'){
    //   this.segment = "Home";
    // }
    // if(this.router.url === '/order'){
    //   this.segment = "Order";
    // }
    // if(this.router.url === '/customer-profile'){
    //   this.segment = "Search";
    // }
    // if(this.router.url === '/customer-profile'){
    //   this.segment = "Profile";
    // }
    
  }

  myOrder() {
    const params: NavigationExtras = {
      queryParams: {
        preUrl: '/home2',
      },
    };
    this.segment == "Order"
    this.router.navigate(['/order'], params);
  

  }

  customerProfile(){
    this.segment == "Profile"

    this.router.navigate(['/customer-profile'])
    // .then(()=>{
    //   window.location.reload()
    // })
  }

  home(){
    this.segment == 'Home'
    this.router.navigate(['/home2'])
    // .then(() => {
    //   window.location.reload();
    // });
    }
    

  

  search(){
    this.segment == 'Search'
    this.router.navigate(['/home2']);
  }

}
