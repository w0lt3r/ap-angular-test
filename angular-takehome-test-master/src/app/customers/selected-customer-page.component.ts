import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { AppDataApiService } from '../app-data/app-data-api.service';
import { CustomerService } from '../app-data/customer.service';
import { Customer } from '../models/customer.interface';

@Component({
  template: `
    <!-- 3. TODO Display the properties of the selected customer -->
    <ng-container *ngIf="selectedCustomer$ | async as selectedCustomer">
      <ul>
        <li>Customer Id: {{ selectedCustomer.id }}</li>
        <li>Customer Name: {{ selectedCustomer.name }}</li>
        <li>Customer Address: {{ selectedCustomer.address }}</li>
        <li>Customer City: {{ selectedCustomer.city }}</li>
        <li>Customer Country: {{ selectedCustomer.country }}</li>
      </ul>
    </ng-container>
   
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedCustomerPageComponent {
  selectedCustomer$: Observable<Customer | undefined>;
  constructor(private customerService: CustomerService, private appDataApiService: AppDataApiService) {
    this.selectedCustomer$= combineLatest([this.customerService.selectedCustomer$, this.appDataApiService.customers$]).pipe(
      map(([customerId, customers])=> customers.find(customer=> customer.id== customerId))
    );
  }
  ngOnInit() {
  }
}
