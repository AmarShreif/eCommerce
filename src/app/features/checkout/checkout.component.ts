import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../cart/services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  subscription: WritableSignal<Subscription | null> = signal(null);

  checkOutForm!: FormGroup;
  // id: string | null = null;
  id: WritableSignal<string | null> = signal(null);

  ngOnInit(): void {
    this.initForm();
    this.getCartId();
  }

  getCartId(): void {
    this.subscription.set(
      this.activatedRoute.paramMap.subscribe({
        next: (urlParams) => {
          this.id.set(urlParams.get('id'));
          console.log(this.id);
        },
        error: (err) => {
          console.log(err);
        },
      })
    );
  }

  initForm(): void {
    this.checkOutForm = this.fb.group({
      shippingAddress: this.fb.group({
        details: [null, [Validators.required]],
        phone: [null, [Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city: [null, [Validators.required]],
      }),
    });
  }

  submitForm(): void {
    if (this.checkOutForm.valid) {
      this.subscription.set(
        this.cartService.checkOutSession(this.id(), this.checkOutForm.value).subscribe({
          next: (res) => {
            console.log(res);
            if (res.status === 'success') {
              open(res.session.url, '_self');
            }
          },
          error: (err) => {
            console.log(err);
          },
        })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription()?.unsubscribe();
  }
}
