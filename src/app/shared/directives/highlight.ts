import { Directive, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class Highlight {
  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  @HostListener('mouseenter') mouseEnter(): void {
    this.addStyle('yellow');
  }
  @HostListener('mouseleave') mouseLeave(): void {
    this.addStyle('');
  }

  addStyle(color: string): void {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }

  // addStyle(color: string): void {
  //   this.el.nativeElement.style.backgroundColor = color;
  // }

  //   @HostListener('mouseenter') mouseEnter(): void {
  //   this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'green');
  // }
  // @HostListener('mouseleave') mouseLeave(): void {
  //   this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', '');
  // }
  //  @HostListener('mouseenter') mouseEnter(): void {
  //   this.el.nativeElement.style.backgroundColor = 'yellow';
  // }
  // @HostListener('mouseleave') mouseLeave(): void {
  //   this.el.nativeElement.style.backgroundColor = '';
  // }
}
