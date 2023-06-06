import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart= [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() {}

  

  getCartItemCount() {

    return (this.cart == null) ? 0 :this.cart.length;
  }

  addProduct(product) {
    let is_in_cart = false;
    console.log("let p of this.cart", this.cart)

   if(this.cart !=null){
    for (let p of this.cart) {
      if (p._id === product._id) {
        is_in_cart = true;
        break;
      }
    }
  }
    
    product.amount = 1;
    if (!is_in_cart) {
      if(this.cart == null){
        console.log("this.cart == null")
        this.cart = [product];
      } else {
        console.log("this.cart.push")

      this.cart.push(product);
      }
    }
    
    localStorage.setItem('cartData',JSON.stringify(this.cart))

   this.cartItemCount.next(this.cartItemCount.value + 1);
   console.log("this.cartItemCount",this.cartItemCount);
    
  }

  getCart() {
    
    this.cart = JSON.parse(localStorage.getItem('cartData'));
    // console.log(localStorage.getItem('cartData'));
    
    return this.cart;
  }

  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p._id === product._id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product) {

    this.getCart();
    console.log(this.cart)
    
    for (let [index, p] of this.cart.entries()) {
      if (p._id === product._id) {
        console.log("this.cartItemCount",this.cartItemCount);
        console.log("this.cartItemCount.value",this.cartItemCount.value);

        this.cartItemCount.next(this.cartItemCount.value - 1);
        console.log("this.cartItemCount",this.cartItemCount);
        console.log("this.cartItemCount.value",this.cartItemCount.value);

        this.cart.splice(index, 1);
        localStorage.setItem('cartData',JSON.stringify(this.cart))

      }
    }

console.log("removeProduct",localStorage.getItem('cartData'));
console.log("removeProduct this.cart",this.cart);
   // this.cart = JSON.stringify(this.cart);

  }

 
}