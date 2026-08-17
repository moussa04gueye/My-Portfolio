import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isMenuOpen = signal(false);

  links = [
    { path: '/', label: 'Accueil' },
    { path: '/projets', label: 'Projets' },
    { path: '/blog', label: 'Blog' },
    { path: '/a-propos', label: 'À propos' },
    { path: '/contact', label: 'Contact' },
  ];

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }
}