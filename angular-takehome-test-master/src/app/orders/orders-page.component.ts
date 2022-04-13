import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { AppDataApiService } from '../app-data/app-data-api.service';
import { CommonServiceService } from '../app-data/common-service.service';
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
    <select [ngModel]="commonService.selectedCustomer$ | async"
    (ngModelChange)="customerSelected($event)">
      <option [ngValue]="null"> ALL</option>
      <option *ngFor="let customer of customers$ | async" [ngValue]="customer" >{{ customer.name}}</option>
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
  constructor(private appDataApiService: AppDataApiService, public commonService: CommonServiceService) {
    this.customers$ = this.appDataApiService.customers$;
    this.products$ = this.appDataApiService.products$;
    this.filteredOrders$ = combineLatest([this.appDataApiService.orders$, this.commonService.selectedCustomer$]).pipe(
      map(([orders, selectedCustomer]) => selectedCustomer == null ? orders : orders.filter(order => order.customerId == selectedCustomer.id)),
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
  ngOnInit(){
    this.commonService.selectedCustomer$.subscribe(c=> console.log(c))
  }
  customerSelected(customer: Customer) {
    this.commonService.selectedCustomer$.next(customer);
  }
}
