import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly toastrService = inject(ToastrService);
  private readonly fb = inject(FormBuilder);
  private readonly cookieService = inject(CookieService);
  msgError: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);
  loginForm!: FormGroup;
  subscription: WritableSignal<Subscription | null> = signal(null);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.subscription()?.unsubscribe();
      // console.log(this.loginForm.value);
      this.subscription.set(
        this.authService.loginForm(this.loginForm.value).subscribe({
          next: (res) => {
            // console.log(res);
            if (res.message === 'success') {
              this.msgError.set('');
              this.cookieService.set('token', res.token);
              console.log(this.authService.deCodeToken());
              this.toastrService.info(res.message);

              this.router.navigate(['/home']);
            }
            this.isLoading.set(false);
          },
          error: (err) => {
            console.log(err);

            this.isLoading.set(false);
          },
        })
      );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
