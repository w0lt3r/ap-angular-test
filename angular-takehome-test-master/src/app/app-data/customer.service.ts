import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Customer } from '../models/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  selectedCustomer$: ReplaySubject<number> = new ReplaySubject(1);
  constructor() {
    this.selectedCustomer$.next(0);
  }
}
