import { ChangeDetectionStrategy, Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { StateService } from '../app-data/state.service';
import { Customer } from '../models/customer.interface';

@Component({
  template: `
    <!-- 3. TODO Display the properties of the selected customer -->
    <ng-container *ngIf="stateService.selectedCustomer$ | async as selectedCustomer">
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
  constructor(public stateService: StateService) {
  }
}
