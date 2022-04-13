import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { AppDataApiService } from '../app-data/app-data-api.service';
import { CustomerService } from '../app-data/customer.service';
import { Customer } from '../models/customer.interface';
import { Product } from '../models/product.interface';
interface OrderView {
  id: number;
  date: string;
  customerName: Observable<string | undefined>;
  productName: Observable<string | undefined>;
}
@Component({
  template: `
    <select (change)="customerSelected($event)">
      <option [value]=0> ALL</option>
      <option  *ngFor="let customer of customers$ | async" [selected]="(customerService.selectedCustomer$ | async)==customer.id" [value]=customer.id >{{ customer.name}}</option>
      <!-- 2. TODO implement a select to filter orders by customer name -->
    </select>
    <table>
      <thead>
        <th>Order Id</th>
        <th>Customer Name</th>
        <th>Order Date</th>
        <th>Product Name</th>
      </thead>
      <tbody>
        <!-- 1. TODO display a list of orders here. -->
        <tr *ngFor="let order of filteredOrders$ | async">
          <td>{{order.id}}</td>
          <td>{{order.customerName | async}}</td>
          <td>{{order.date | date:'dd/MM/yyyy'}}</td>
          <td>{{order.productName | async}}</td>
        <tr>
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class OrdersPageComponent {
  customers$: Observable<Customer[]>;
  products$: Observable<Product[]>;
  filteredOrders$: Observable<OrderView[]>;
  constructor(private appDataApiService: AppDataApiService, public customerService: CustomerService) {
    this.customers$ = this.appDataApiService.customers$;
    this.products$ = this.appDataApiService.products$;
    this.filteredOrders$ = combineLatest([this.appDataApiService.orders$, this.customerService.selectedCustomer$]).pipe(
      map(([orders, selectedCustomer]) => selectedCustomer == 0 ? orders : orders.filter(order => order.customerId == selectedCustomer)),
      map((orders) => orders.map(order => {
        return {
          customerName: this.customers$.pipe(map(customers => customers.find(c => c.id == order.customerId)?.name)),
          productName: this.products$.pipe(map(products => products.find(c => c.id == order.productId)?.name)),
          id: order.id,
          date: order.date
        }
      }))
    );
  }
  ngOnInit() {
    this.customerService.selectedCustomer$.subscribe(c=> console.log(c))
  }
  customerSelected($event: any) {
    // (change)="customerSelected($event)" to get the customer.id
    // console.log($event.target.value)
    this.customerService.selectedCustomer$.next($event.target.value);
  }
}
