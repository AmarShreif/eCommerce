import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SpecificCateService {
  private readonly http = inject(HttpClient);

  getSpecificCategories(id: string | null): Observable<any> {
    return this.http.get(environment.baseUrl + `categories/${id}`);
  }
}
