import { Directive, ElementRef, Input, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Ajoute la classe "is-visible" dès que l'élément entre dans le viewport.
 * Usage : <div appScrollReveal>...</div>
 * Optionnel : <div appScrollReveal [revealDelay]="150">...</div> (ms)
 */
@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;

  private el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const element = this.el.nativeElement;
    element.classList.add('scroll-reveal');
    if (this.revealDelay) {
      element.style.transitionDelay = `${this.revealDelay}ms`;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add('is-visible');
            this.observer?.unobserve(element);
          }
        });
      },
      { threshold: 0.15 }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}