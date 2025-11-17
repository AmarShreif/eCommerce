import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { ForgetPasswordComponent } from './core/auth/forget-password/forget-password.component';
import { NotfoundComponent } from './features/notfound/notfound.component';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';
import { RenderMode } from '@angular/ssr';

export const routes: Routes = [
 
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    data: { renderMode: RenderMode.Prerender } // ✅ ضع المعلومات هنا
  },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isLoggedGuard],
    data: { renderMode: RenderMode.Prerender },
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component').then(c => c.LoginComponent),
        title: 'Login Page',
        data: { renderMode: RenderMode.Prerender }
      },
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register Page',
        data: { renderMode: RenderMode.Prerender }
      },
      {
        path: 'forget',
        component: ForgetPasswordComponent,
        title: 'Forget Password',
        data: { renderMode: RenderMode.Prerender }
      }
    ]
  },

  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    data: { renderMode: RenderMode.Prerender },
    children: [
      {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then(c => c.HomeComponent),
        title: 'Home',
        data: { renderMode: RenderMode.Prerender }
      },
      // ... باقي الـ routes بنفس الأسلوب
    ]
  },

  {
    path: '**',
    component: NotfoundComponent,
    title: 'Not Found',
    data: { renderMode: RenderMode.Prerender }
  }
];
