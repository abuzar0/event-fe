import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule,CommonModule],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss'
})
export class InputSearchComponent {
  @Output() searchQuery: EventEmitter<string> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onSearchChange(searchValue: string): void {
    // Emit search value when input changes
    this.searchQuery.emit(searchValue);
  }
}
