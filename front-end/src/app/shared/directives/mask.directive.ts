import { Directive, HostListener, Input } from '@angular/core';

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

    switch (this.mask) {
      case 'email':
        this.handleEmailTransform(input);
        break;

      case 'money':
        this.handleMoneyMask(input);
        break;

      default:
        this.handleNumericMask(input);
        break;
    }
  }

  private handleEmailTransform(input: HTMLInputElement): void {
    input.value = input.value.toLowerCase();
  }

  private handleMoneyMask(input: HTMLInputElement): void {
    let value = input.value.replace(/\D/g, ''); // remove tudo que não é número

    if (value === '') {
      input.value = '';
      return;
    }

    const numericValue = parseFloat(value) / 100;

    const formatted = numericValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    input.value = formatted;
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
