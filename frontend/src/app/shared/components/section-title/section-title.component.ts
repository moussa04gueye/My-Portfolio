import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section-title',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-title.component.html',
  styleUrl: './section-title.component.css',
})
export class SectionTitleComponent {
  @Input() eyebrow?: string;
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() align: 'left' | 'center' = 'left';
}