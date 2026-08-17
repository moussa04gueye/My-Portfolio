import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class AdminLayoutComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  currentUser = this.auth.currentUser;

  navItems = [
    { path: '/admin/dashboard', label: 'Tableau de bord' },
    { path: '/admin/projets', label: 'Projets' },
    { path: '/admin/blog', label: 'Blog' },
    { path: '/admin/competences', label: 'Compétences' },
    { path: '/admin/experiences', label: 'Expériences' },
    { path: '/admin/formations', label: 'Formations' },
    { path: '/admin/messages', label: 'Messages' },
    { path: '/admin/settings', label: 'Réglages' },
  ];

  logout(): void {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/admin/login']),
      error: () => this.router.navigate(['/admin/login']),
    });
  }
}