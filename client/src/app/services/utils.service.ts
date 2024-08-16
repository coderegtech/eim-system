import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  public darkmode = signal<boolean>(false);

  constructor() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      this.darkmode.set(true);
    }
  }

  toggleDarkmode() {
    this.darkmode.set(!this.darkmode());
    localStorage.setItem('theme', this.darkmode() ? 'dark' : 'light');
  }
}
