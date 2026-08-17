import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, DashboardStats } from '../../../core/services/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  stats = signal<DashboardStats | null>(null);

  ngOnInit(): void {
    this.dashboardService.getStats().subscribe({
      next: (res) => this.stats.set(res),
    });
  }
}