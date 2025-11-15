import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { PopularCategoriesComponent } from '../home/components/popular-categories/popular-categories.component';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { Subscription } from 'rxjs';
import { Category } from '../../core/models/product.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [PopularCategoriesComponent, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private readonly categoriesService = inject(CategoriesService);
  subscription: WritableSignal<Subscription | null> = signal(null);
  categoriesList: WritableSignal<Category[]> = signal([]);

  ngOnInit(): void {
    this.getAllCategoriesData();
  }
  getAllCategoriesData(): void {
    this.subscription.set(
      this.categoriesService.getAllCategories().subscribe({
        next: (res) => {
          this.categoriesList.set(res.data);
        },
      })
    );
  }
  ngOnDestroy(): void {
    this.subscription()?.unsubscribe();
  }
}
