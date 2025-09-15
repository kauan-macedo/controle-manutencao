// src/app/shared/theme-toggle/theme-toggle.component.ts
import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme-service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: `
    <button (click)="toggleTheme()" 
            class="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 z-50 text-gray-800 dark:text-gray-200 flex items-center justify-center">
      
      <svg [class.hidden]="themeService.isDarkMode"
           xmlns="http://www.w3.org/2000/svg" 
           class="h-6 w-6" 
           fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      
      <svg [class.hidden]="!themeService.isDarkMode"
           xmlns="http://www.w3.org/2000/svg" 
           class="h-6 w-6" 
           fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </button>
  `
})
export class ThemeToggle {
  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}