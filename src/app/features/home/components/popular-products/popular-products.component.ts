import { Component, inject, Input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Product } from '../../../../core/models/product.interface';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ProductsService } from '../../../../core/services/product/products.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css',
})
export class PopularProductsComponent implements OnInit, OnDestroy {
  private readonly productsService = inject(ProductsService);
  // productList: Product[] = [];
  productList: WritableSignal<Product[]> = signal([]);
  subscription: WritableSignal<Subscription | null> = signal(null);
  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(): void {
    this.subscription.set(
      this.productsService.getAllProducts().subscribe({
        next: (res) => {
          this.productList.set(res.data);
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
