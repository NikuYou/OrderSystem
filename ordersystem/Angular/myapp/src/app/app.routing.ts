import { ModuleWithProviders }   from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { AppComponent }          from './app.component';
import { PageDefault }           from './app.pagedefault';
import { CurrentOrderComponent } from './app.current_order';
import { OrderHistoryComponent } from './app.order_history';

const appRoutes: Routes = [
  { path: 'current_order', component: CurrentOrderComponent },
  { path: 'order_history', component: OrderHistoryComponent },
  { path: '', redirectTo: '/current_order', pathMatch: 'full' },
  { path: '**', component: PageDefault }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
