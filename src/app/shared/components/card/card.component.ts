import {
  Component,
  inject,
  input,
  Input,
  InputSignal,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { TermPipe } from '../../pipes/term-pipe';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card',
  imports: [RouterLink, TermPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  subscription: WritableSignal<Subscription | null> = signal(null);

  // @Input({ required: true }) product: Product = {} as Product;
  product: InputSignal<Product> = input({} as Product);

  addProductItemToCart(id: string): void {
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
}
