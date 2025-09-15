import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  public isDarkMode: boolean = false;

  constructor() {
    this.initializeTheme();
  }

  public initializeTheme() {
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.applyTheme(savedTheme === 'dark');
    } else {
      
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.applyTheme(prefersDark);
    }
  }

  private applyTheme(isDark: boolean) {
    this.isDarkMode = isDark;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

 
  toggleTheme() {
    const newTheme = !this.isDarkMode;
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    this.applyTheme(newTheme);
  }
}