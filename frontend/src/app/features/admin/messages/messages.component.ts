import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMessageService } from '../../../core/services/admin-message.service';
import { ContactMessage } from '../../../core/models/Contact-message';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  private adminMessageService = inject(AdminMessageService);

  messages = signal<ContactMessage[]>([]);
  selected = signal<ContactMessage | null>(null);

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.adminMessageService.getAll().subscribe({ next: (res) => this.messages.set(res.data) });
  }

  open(message: ContactMessage): void {
    this.adminMessageService.getOne(message.id).subscribe({
      next: (res) => {
        this.selected.set(res.data);
        this.load(); // rafraîchit le statut "lu"
      },
    });
  }

  close(): void {
    this.selected.set(null);
  }

  remove(message: ContactMessage, event: Event): void {
    event.stopPropagation();
    if (!confirm(`Supprimer le message de ${message.name} ?`)) return;
    this.adminMessageService.delete(message.id).subscribe({
      next: () => {
        if (this.selected()?.id === message.id) this.close();
        this.load();
      },
    });
  }
}