import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecificCateService } from './service/specific-cate.service';

@Component({
  selector: 'app-specific-categories',
  imports: [],
  templateUrl: './specific-categories.component.html',
  styleUrl: './specific-categories.component.css',
})
export class SpecificCategoriesComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly specificCateService = inject(SpecificCateService);
  id: WritableSignal<string | null> = signal(null);

  ngOnInit(): void {
    this.getCategoriesId();
    this.getSpecificCategories();
  }

  getCategoriesId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramUrl) => {
        this.id.set(paramUrl.get('id'));
      },
    });
  }
  getSpecificCategories(): void {
    this.specificCateService.getSpecificCategories(this.id()).subscribe({
      next: (res) => {
        console.log(res.data);
      },
    });
  }
}
