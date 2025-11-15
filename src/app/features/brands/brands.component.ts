import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from './brands.service';
import { Brands } from './brands.interface';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);
  brandList: WritableSignal<Brands[]> = signal([]);

  ngOnInit(): void {
    this.getProductBrands();
    initFlowbite();
  }
  getProductBrands(): void {
    this.brandsService.getProductBrands().subscribe({
      next: (res) => {
        this.brandList.set(res.data);
      },
    });
  }
}
