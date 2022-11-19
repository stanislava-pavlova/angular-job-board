import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-field-error-message',
  templateUrl: './field-error-message.component.html',
  styleUrls: ['./field-error-message.component.scss'],
})
export class FieldErrorMessageComponent {
  @Input() control!: FormControl;

  constructor() {}

  get errorMessage(): string {
    if (this.control.touched && this.control.invalid) {
      if (this.control.errors?.['required']) {
        return 'This field is required';
      }

      if (this.control.errors?.['minlength']) {
        return `This field should contain at least ${this.control.errors['minlength'].requiredLength}. Currently they are ${this.control.errors['minlength'].actualLength}.`;
      }
    }
    return '';
  }
}
