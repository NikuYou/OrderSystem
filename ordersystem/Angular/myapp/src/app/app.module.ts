import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { AppComponent }   from './app.component';
import { PageDefault }    from './app.pagedefault';
import { CurrentOrderComponent } from './app.current_order';
import { OrderHistoryComponent } from './app.order_history';
import { routing }        from './app.routing';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    imports: [BrowserModule, FormsModule, routing,HttpClientModule],
    declarations: [AppComponent, PageDefault,
        CurrentOrderComponent, OrderHistoryComponent],
    bootstrap: [AppComponent],
})
export class AppModule { }
