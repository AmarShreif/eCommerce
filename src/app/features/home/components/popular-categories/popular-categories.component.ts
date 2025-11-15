import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories/categories.service';
import { Category } from '../../../../core/models/product.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit, OnDestroy {
  private readonly categoriesService = inject(CategoriesService);
  // categoriesList:Category [] =[]
  categoriesList: WritableSignal<Category[]> = signal([]);
  subscription: WritableSignal<Subscription | null> = signal(null);
  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    margin: 10,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
        stagePadding: 10,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
      1100: {
        items: 6,
      },
    },
    nav: false,
  };

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
