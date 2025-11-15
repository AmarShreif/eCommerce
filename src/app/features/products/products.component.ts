import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ProductsService } from '../../core/services/product/products.service';
import { Product } from '../../core/models/product.interface';
import { CardComponent } from '../../shared/components/card/card.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule, FormsModule, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly productsService = inject(ProductsService);
  private readonly ngxSpinnerService = inject(NgxSpinnerService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);
  // productList:Product[]=[];
  productList: WritableSignal<Product[]> = signal([]);
  subscription: WritableSignal<Subscription | null> = signal(null);
  // text: WritableSignal<string> = signal(' ');
  // pageSize: WritableSignal<number> = signal(0);
  text: string = '';
  pageSize!: number;
  p!: number;
  total!: number;

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(page: number = 1): void {
    this.subscription.set(
      this.productsService.getAllProducts(page).subscribe({
        next: (res) => {
          this.productList.set(res.data);
          this.pageSize = res.metadata.limit;
          this.p = res.metadata.currentPage;
          this.total = res.results;
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
