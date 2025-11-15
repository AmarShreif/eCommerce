import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const toasteService = inject (ToastrService)

  return next(req).pipe(catchError((err)=>{

    toasteService.error(err.error.message)

    return throwError(()=>err)                                 
  }));
};
