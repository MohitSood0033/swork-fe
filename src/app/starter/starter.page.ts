import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.page.html',
  styleUrls: ['./starter.page.scss'],
})
export class StarterPage implements OnInit {

  constructor(private router:Router) { 
    setTimeout(() => {
      console.log("helll");
      
      if(localStorage.getItem('auth-token')){
        this.router.navigate(['home2'])
        
      }else{
        this.router.navigateByUrl('onbord')
      }
      // this.router.navigateByUrl('home1')
    

      
    }, 1000);
  }

  ngOnInit() {
  }

}
