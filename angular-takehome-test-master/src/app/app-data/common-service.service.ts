import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Customer } from '../models/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CommonServiceService {
  selectedCustomer$: ReplaySubject<Customer | null | undefined> = new ReplaySubject(1);
  constructor() { 
    this.selectedCustomer$.next(null);
  }
}
