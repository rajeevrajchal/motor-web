import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() variant: 'outline' | 'contained' = 'contained';
  @Input() extraClass: string = '';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'md';
  @Input() color:
    | 'primary'
    | 'neutral'
    | 'secondary'
    | 'accent'
    | 'ghost'
    | 'error' = 'primary';

  base: string = 'btn w-full';

  getClass() {
    return `${this.base} ${
      this.variant === 'contained' ? 'btn-primary' : `btn-${this.variant}`
    } ${`btn-${this.color}`} ${`btn-${this.size}`} ${this.extraClass} `;
  }
}
