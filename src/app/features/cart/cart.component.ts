import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './interface/cart.interface';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  cartDetails: Cart | null = {} as Cart;
  // cartDetails: WritableSignal<Cart | null> = signal({} as Cart);
  Subscription: WritableSignal<Subscription | null> = signal(null);

  ngOnInit(): void {
    this.getLoggedUserCart();
  }

  getLoggedUserCart(): void {
    this.Subscription.set(
      this.cartService.getLoggedUserCart().subscribe({
        next: (res) => {
          console.log(res.data);
          this.cartDetails = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  removeItem(id: string): void {
    this.Subscription.set(
      this.cartService.removeSpecificCartItem(id).subscribe({
        next: (res) => {
          console.log(res);
          // this.cartDetails = res.data
          this.getLoggedUserCart();
          this.cartService.countNumber.set(res.numOfCartItems);

          this.toastrService.error('Product removed successfully from your cart');
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  updateItem(id: string, count: number): void {
    this.Subscription.set(
      this.cartService.updateCartCount(id, count).subscribe({
        next: (res) => {
          console.log(res);
          this.cartService.countNumber.set(res.numOfCartItems);
          this.cartDetails = res.data;
          // this.getLoggedUserCart()
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  clearCart(): void {
    this.Subscription.set(
      this.cartService.clearCart().subscribe({
        next: (res) => {
          console.log(res);

          if (res.message === 'success') {
            this.cartDetails = res.data;
          }
          // this.getLoggedUserCart()
          this.cartService.countNumber.set(res.numOfCartItems);
          this.toastrService.error('Your cart has been cleared successfully.');
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.Subscription()?.unsubscribe();
  }
}
