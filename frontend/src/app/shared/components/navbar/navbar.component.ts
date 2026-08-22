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
  theme = signal<'dark' | 'light'>('dark');

  links = [
    { path: '/', label: 'Accueil' },
    { path: '/projets', label: 'Projets' },
    { path: '/blog', label: 'Blog' },
    { path: '/a-propos', label: 'À propos' },
    { path: '/contact', label: 'Contact' },
    { path: '#competences', label: 'Compétences'}
  ];

  constructor() {
    const savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
    const initialTheme = savedTheme === 'light' ? 'light' : 'dark';
    this.setTheme(initialTheme, false);
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  toggleTheme(): void {
    const nextTheme = this.theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme, true);
  }

  private setTheme(mode: 'dark' | 'light', persist = true): void {
    this.theme.set(mode);
    document.body.setAttribute('data-theme', mode);

    if (persist && typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', mode);
    }
  }
}