import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly http = inject (HttpClient)
  private readonly cookieService = inject (CookieService)
  private readonly router = inject (Router)
  
  registerForm(data:object):Observable<any>{
   return this.http.post(environment.baseUrl+'auth/signup', data)
  }
  loginForm(data:object):Observable<any>{
   return this.http.post(environment.baseUrl+'auth/signin', data)
  }

  logOut():void{
    this.cookieService.delete('token')
    this.router.navigate(['/login'])
  }

  deCodeToken(){
    let token ;
  try {
    token =  jwtDecode(this.cookieService.get('token'))
    
  } catch (error) {
    this.logOut()
  }    

  return token
  }

  submitVerifyEmail(data:object):Observable<any>{
    return this.http.post(environment.baseUrl + 'auth/forgotPasswords' , data)
  }
  submitVerifyCode(data:object):Observable<any>{
    return this.http.post(environment.baseUrl + 'auth/verifyResetCode' , data)
  }
  submitResetPassword(data:object):Observable<any>{
    return this.http.put(environment.baseUrl + 'auth/resetPassword' , data)
  }
}
