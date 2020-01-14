import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template:   
      `<div class="container">
    <nav>
    <a routerLink="/current_order" routerLinkActive="active">Current Order</a> |
    <a routerLink="/order_history" routerLinkActive="active">Order History</a>
    </nav>
    <!-- Where router should display a view -->
    <router-outlet></router-outlet>
    </div>`
})
export class AppComponent { }
