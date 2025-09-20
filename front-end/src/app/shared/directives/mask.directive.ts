import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appMask]',
  standalone: true,
})

export class MaskDirective {
  @Input('appMask') mask: string = '';

  constructor() {}

  @HostListener('input', ['$event'])

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.mask === 'email') {
      this.handleEmailTransform(input);
    } else {
      this.handleNumericMask(input);
    }
  }

  private handleEmailTransform(input: HTMLInputElement): void {
    input.value = input.value.toLowerCase();
  }

  private handleNumericMask(input: HTMLInputElement): void {
    const unmaskedValue = input.value.replace(/\D/g, '');

    if (!unmaskedValue) {
      input.value = '';
      return;
    }

    let valueIndex = 0;

    input.value = this.mask
      .split('')
      .map(maskChar => {
        if (valueIndex < unmaskedValue.length) {
          return maskChar === '0' ? unmaskedValue[valueIndex++] : maskChar;
        }
        return '';
      })

      .join('');
  }
}
