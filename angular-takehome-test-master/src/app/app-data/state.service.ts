import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, map } from 'rxjs';
import { Customer } from '../models/customer.interface';
import { Product } from '../models/product.interface';
import { AppDataApiService } from './app-data-api.service';
interface OrderView {
  id: number;
  date: string;
  customerName: string | undefined;
  productName: string | undefined;
}
@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _filteredOrders = new BehaviorSubject<OrderView[]>([]);
  filteredOrders$ = this._filteredOrders.asObservable();

  private _products = new BehaviorSubject<Product[]>([]);
  products$ = this._products.asObservable();

  private _customers = new BehaviorSubject<Customer[]>([]);
  customers$ = this._customers.asObservable();

  private _selectedCustomer = new BehaviorSubject<Customer | undefined>(undefined);
  selectedCustomer$ = this._selectedCustomer.asObservable();

  private orders: OrderView[] = [];
  constructor(private appDataApiService: AppDataApiService) {
    this.loadInitialState();
  }
  async loadInitialState() {
    this.customers = await lastValueFrom(this.appDataApiService.customers$);
    this.products = await lastValueFrom(this.appDataApiService.products$);
    this.orders = await lastValueFrom(
      this.appDataApiService.orders$.pipe(
        map(orders => orders.map(order => {
          return {
            id: order.id,
            date: order.date,
            customerName: this.customers.find(customer => customer.id == order.customerId)?.name,
            productName: this.products.find(product => product.id == order.productId)?.name
          }
        }))
      )
    );
    this.filteredOrders = this.orders;
  }
  private get selectedCustomer(): Customer | undefined {
    return this._selectedCustomer.getValue();
  }

  private set selectedCustomer(val: Customer | undefined) {
    this._selectedCustomer.next(val);
  }
  customerChanged(customerName: string) {
    this.selectedCustomer = this.customers.find(customer => customer.name == customerName);
    this.filterOrders(this.selectedCustomer?.name ?? '');
  }
  private get customers(): Customer[] {
    return this._customers.getValue();
  }

  private set customers(val: Customer[]) {
    this._customers.next(val);
  }

  private get products(): Product[] {
    return this._products.getValue();
  }

  private set products(val: Product[]) {
    this._products.next(val);
  }

  private get filteredOrders(): OrderView[] {
    return this._filteredOrders.getValue();
  }

  private set filteredOrders(val: OrderView[]) {
    this._filteredOrders.next(val);
  }
  filterOrders(customerName: string) {
    this.filteredOrders = customerName == '' ? this.orders : this.orders.filter(order => order.customerName == customerName);
  }
}
