import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems: any = [];
  public productsList = new BehaviorSubject<any>([]);
  constructor() {}

  getProducts() {
    return this.productsList.asObservable();
  }

  setProduct(product: any) {
    this.cartItems.push(...product);
    this.productsList.next(product);
  }

  getTotalPrice(): number {
    let total = 0;
    this.cartItems.map((item: any) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  addToCart(product: any) {
    this.cartItems.push(product);
    product.quantity = 1;
    this.productsList.next(this.cartItems);
    this.getTotalPrice();
  }

  removeCartItem(product: any) {
    this.cartItems.map((item: any, index: any) => {
      if (product.id === item.id) {
        this.cartItems.splice(index, 1);
      }
    });
  }
}
