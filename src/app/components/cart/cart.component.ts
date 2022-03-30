import {
  AfterViewChecked,
  Component,
  OnInit,
  ViewEncapsulation,
  Input
} from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CartComponent implements OnInit {
  public products: any;
  public cartProducts: any;
  public totalValue: number = 0;

  @Input() rate : any;
  @Input() symbol : any;
  constructor(private api: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe((res) => {
      this.products = res;
      this.products.sort((a : any, b : any) => parseFloat(a.price) - parseFloat(b.price));
    });

    this.products?.forEach((item: any) => {
      Object.assign(item, { quantity: 1, total: item.price });
    });

    this.cartService.getProducts().subscribe((res) => {
      this.cartProducts = res;
    });
  }

  addItemToCart(product: any) {
    this.cartService.addToCart(product);
    this.cartProducts = this.cartService.cartItems;
    this.cartProducts.sort((a : any, b : any) => parseFloat(a.price) - parseFloat(b.price));

    this.totalValue = this.cartService.getTotalPrice();
    this.products.map((item: any, index: any) => {
      if (product.id === item.id) {
        this.products.splice(index, 1);
      }
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    this.products.push(item);
    this.products.quantity = 0;
    this.products.sort((a : any, b : any) => parseFloat(a.price) - parseFloat(b.price));
    this.totalValue = this.cartService.getTotalPrice();

  }

  incQnt(product: any) {
    if (product.quantity < 9) {
    product.quantity++;
    }
    this.totalValue = this.cartService.getTotalPrice();
  }

  decQnt(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    }
    this.totalValue = this.cartService.getTotalPrice();
  }

}
