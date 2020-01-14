import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const BASE_URL = "http://localhost:1337/Order/";
@Component({
    templateUrl: './order_history.html'
})
export class OrderHistoryComponent { 
    _ordersArray: Array<any>;
    _http:HttpClient;
    _id:Number;
    _errorMessage:String = "";


    constructor(private http: HttpClient) {
        this._http = http;
        this.getAllOrders();
    }

    getAllOrders() {
      let url = BASE_URL + 'Index'
      this._http.get<any>(url)
          // Get data and wait for result.
          .subscribe(result => {
              this._ordersArray = result.orders;
          }, 

          error =>{
            // Let user know about the error.
              this._errorMessage = error;
          })
    }

    deleteOrder(_id) {

      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }), 
        "body": { _id:_id}
      };
    
      let url = BASE_URL + "Delete"
      this.http.delete(url , httpOptions) 
      .subscribe(
          // Data is received from the post request.
          (data) => {
              this._errorMessage = data["errorMessage"];
              this.getAllOrders(); 
          },
          // An error occurred. Data is not received. 
          error  => {
            this._errorMessage = error; 
          });
    }
}