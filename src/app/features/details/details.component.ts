import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsService } from './services/product-details.service';
import { Product } from '../../core/models/product.interface';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  subscription: WritableSignal<Subscription | null> = signal(null);
  // productDetails: Product = {} as Product;
  productDetails: WritableSignal<Product> = signal({} as Product);
  // id: string | null = null;
  id: WritableSignal<string | null> = signal(null);

  ngOnInit(): void {
    this.getProductId();
    this.getProductDetailsService();
  }

  getProductId(): void {
    this.subscription.set(
      this.activatedRoute.paramMap.subscribe({
        next: (urlParams) => {
          this.id.set(urlParams.get('id'));
        },
      })
    );
  }

  getProductDetailsService(): void {
    this.subscription.set(
      this.productDetailsService.getProductDetails(this.id()).subscribe({
        next: (res) => {
          console.log(res);

          this.productDetails.set(res.data);
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }
  addProductToCart(id: string): void {
    this.subscription.set(
      this.cartService.addProductToCart(id).subscribe({
        next: (res) => {
          console.log(res);
          this.cartService.countNumber.set(res.numOfCartItems);
          if (res.status == 'success') {
            this.toastrService.info(res.message, 'FreshCart');
          }
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription()?.unsubscribe();
  }
}
