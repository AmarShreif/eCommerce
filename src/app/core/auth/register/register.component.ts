import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly toastrService = inject(ToastrService);

  msgError: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);
  registerForm!: FormGroup;
  subscription: WritableSignal<Subscription | null> = signal(null);

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registerForm = this.fb.group(
      {
        name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
        rePassword: [null, [Validators.required]],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      },
      { validators: this.confirmPassword }
    );
  }

  confirmPassword(group: AbstractControl) {
    let password = group.get('password')?.value;
    let rePassword = group.get('rePassword')?.value;

    if (password === rePassword) {
      return null;
    } else {
      group.get('rePassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    }
  }

  submitForm(): void {
    if (this.registerForm.valid) {
      this.subscription()?.unsubscribe();
      this.isLoading.set(true);
      console.log(this.registerForm.value);
      this.subscription.set(
        this.authService.registerForm(this.registerForm.value).subscribe({
          next: (res) => {
            console.log(res);
            if (res.message === 'success') {
              this.toastrService.info(res.message);

              this.router.navigate(['/login']);
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
      this.registerForm.setErrors({ mismatch: true });
      // this.registerForm.get('rePassword')?.patchValue(" ")
      this.registerForm.markAllAsTouched();
    }
  }
}
