import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';

const BASE_URL = "http://localhost:1337/";

@Component({
    templateUrl: './current_order.html'
})
export class CurrentOrderComponent {
    
    _productsArray: Array<any>;
    _ordersArray: Array<any>;
    _errorMessage1:String = "";
    _errorMessage2:String = "";
    _productName:String;
    _msg:string = "";
    _http:HttpClient;
    _errorMessage:String = "";

    _id:Number;
    _singleProductNumber : number = null;
    _name: string = "";
    _singleProductPrice: number = 0;

    _orderid: Number;
    _firstName: string;
    _lastName: string;
    _address: string;
    _amount: number;

    _itemArray: Array<any> = [];
    _qty: number;
    tax: number = 0;
    finaltotal: number = 0;
    displaytax: string;
    displaytotal: string;

    _is_address_submitted: boolean = false;

    // Since we are using a provider above we can receive 
    // an instance through a constructor.
    constructor(private http: HttpClient) {
        this._http = http;
        this.getAllProducts();
    }

    getAllProducts() {
      let url = BASE_URL + 'Product/Index'
      this._http.get<any>(url)
          // Get data and wait for result.
          .subscribe(result => {
              this._productsArray = result.products;
          }, 

          error =>{
            // Let user know about the error.
              this._errorMessage = error;
          })
    }

    getAllOrders() {
        let url = BASE_URL + 'Order/Index'
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

    createOrder() {
        if(this._firstName == null){
            alert("enter your first name");
            return;
        }
        if(this._lastName == null){
            alert("enter your last name");
            return;
        }
        if(this._address == null){
            alert("enter your address");
            return;
        }
        if(this._is_address_submitted == false){
            alert("submit your address first");
            return;
        }
        if(this.displaytotal == null){
            alert("pick some products");
            return;
        }

        // This free online service receives post submissions.
        this.http.post(BASE_URL + "Order/CreateOrder",
            {
                orderid:  this._orderid,
                firstName:   this._firstName,
                lastName: this._lastName,
                address: this._address,
                amount: this.displaytotal
            })
        .subscribe(
            // Data is received from the post request.
            (data) => {
                // Inspect the data to know how to parse it.
                console.log("POST call successful. Inspect response.", 
                            JSON.stringify(data));
                this._errorMessage = data["errorMessage"];
                this.getAllOrders();
                  
            },
            // An error occurred. Data is not received. 
            error => {
                this._errorMessage = error;                
            });

        location.reload();
    }

    submitAddress(){
        if(/^\d+\s[A-z]+\s[A-z]+/.test(this._address)== false){
            this._errorMessage1 = "invalid address";
        }
        else{
            this._errorMessage1 = "";
            this._msg = "Order for "+this._firstName+" "+this._lastName+". Address: "+this._address;
            this._is_address_submitted = true;
        }
    }

    addItem(){
        if(this._id == null){
            this._errorMessage2 = "Please choose a product";
            return;
        }
        if(this._qty == null){
            this._errorMessage2 = "Please enter a qty";
            return;
        }
        if(this._qty <= 0){
            this._errorMessage2 = "Please enter a valid qty";
            return;
        }
        this._errorMessage2 = "";
        this.getAllProducts();
        for(var i =0; i < this._productsArray.length; i++){
            if(this._productsArray[i]._id == this._id){
                this._name = this._productsArray[i].productName;
                this._singleProductPrice = this._productsArray[i].price;
            }
            // get your item from the product array
        }
        var item =  {_name:this._name,_qty:this._qty,_price:this._singleProductPrice,_amount: this._singleProductPrice*this._qty};
        var check  = "";
        for(var j = 0; j< this._itemArray.length; j++){
            if(item._name == this._itemArray[j]._name){
                check += j ;
            }
            //mark the index of item in your array
        }
        if(check == "" ){
            this._itemArray.push(item);
        }
        //add item into the array
        else{
            this._itemArray[check]._qty += item._qty;
            this._itemArray[check]._amount += item._amount;
        }
        //if the item already in your array, update it
        var totalamount = 0;
        for(var k = 0; k < this._itemArray.length; k++){
            totalamount += this._itemArray[k]._amount;
        }
        // calculate the total amount before tax
        this.tax = totalamount*0.07;
        this.finaltotal = totalamount + this.tax;
        this.displaytax = (this.tax).toFixed(2);
        this.displaytotal = (this.finaltotal).toFixed(2);
    }

    deleteItem(item){
        for(var i = 0;i < this._itemArray.length; i++){
            if(item._name == this._itemArray[i]._name){
                this._itemArray.splice(i,1);
            }
        }
        var totalamount = 0;
        for(var k = 0; k < this._itemArray.length; k++){
            totalamount += this._itemArray[k]._amount;
        }
        // calculate the total amount before tax
        this.tax = totalamount*0.07;
        this.finaltotal = totalamount + this.tax;
        this.displaytax = (this.tax).toFixed(2);
        this.displaytotal = (this.finaltotal).toFixed(2);
    }
 }

