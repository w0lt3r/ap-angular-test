import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StateService } from '../app-data/state.service';

@Component({
  template: `
    <select (change)="customerSelected($event)">
      <option value=''> ALL</option>
      <option  *ngFor="let customer of stateService.customers$ | async" [selected]="(stateService.selectedCustomer$ | async)?.name==customer.name" [value]=customer.name>{{ customer.name}}</option>
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
        <tr *ngFor="let order of stateService.filteredOrders$ | async">
          <td>{{order.id}}</td>
          <td>{{order.customerName}}</td>
          <td>{{order.date | date:'dd/MM/yyyy'}}</td>
          <td>{{order.productName}}</td>
        <tr>
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class OrdersPageComponent {
  constructor(public stateService: StateService) {
 
  }
  customerSelected($event: any) {
    this.stateService.customerChanged($event.target.value);
  }
}
