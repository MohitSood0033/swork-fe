import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
const AUTH_API = environment.baseUrl;
const httpOptions = {
  headers: new HttpHeaders({
    "X-Custom-Header": "application/json",
    // "x-access-token":token//
  })
};
@Injectable({
  providedIn: 'root'
})
export class DeliveryAdressService {

  constructor(private http : HttpClient) { }

  createAddress(
    firstname:any,lastname:any,streetAddress:any,phone:number,city:any,state:any,pin:any,cu_id: any
  ): Observable<any> {
    console.log('cu_id',cu_id)
    return this.http.post(
      AUTH_API + 'create-deliveryAddress',
      {
        firstname,
        lastname,
        streetAddress,
        phone,
        city,
        state,
        pin,
        cu_id,
      },
      httpOptions
    );
  }
  getAddress(customer_id:any){
    console.log('cu_id',customer_id)
    return this.http.post(
      AUTH_API + 'get-deliveryAddress',
      {
        customer_id
      },
      httpOptions
    );
  }

  getSelectedAddress(addressid:any){
    console.log('addressid',addressid)
    return this.http.post(
      AUTH_API + 'get-selectedDeliveryAddress',
      {
        addressid
      },
      httpOptions
    );
  }
}
