import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

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
    { path: '/', label: 'Compétences', fragment: 'skills' },
    { path: '/projets', label: 'Projets' },
    { path: '/blog', label: 'Blog' },
    { path: '/a-propos', label: 'À propos' },
    { path: '/contact', label: 'Contact' },
  ];

  constructor(private router: Router) {
    const savedTheme = typeof localStorage !== 'undefined' ? localStorage.getItem('theme') : null;
    const initialTheme = savedTheme === 'light' ? 'light' : 'dark';
    this.setTheme(initialTheme, false);
  }

  handleLinkClick(link: { path: string; fragment?: string }, event: Event): void {
    this.closeMenu();

    if (!link.fragment) {
      return;
    }

    const target = document.getElementById(link.fragment);
    if (target) {
      event.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });

      if (window.location.pathname === '/') {
        history.replaceState(null, '', `/#${link.fragment}`);
      } else {
        this.router.navigateByUrl(`/#${link.fragment}`);
      }
      return;
    }

    this.router.navigateByUrl(`/${link.fragment ? `#${link.fragment}` : ''}`);
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