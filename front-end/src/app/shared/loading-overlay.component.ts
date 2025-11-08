import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  standalone: true,
  template: `
    @if (visible) {
      <div class="fixed inset-0 bg-black/40 z-[1001] flex items-center justify-center cursor-wait">
        <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
      </div>
    }
  `
})
export class LoadingOverlayComponent {
  @Input() visible = false;
}
