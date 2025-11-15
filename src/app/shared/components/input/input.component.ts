import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input() control: any;
  @Input() typeInput!: string;
  @Input() idInput!: string;
  @Input() element: string = 'input';
  @Input() labelInput!: string;
  flag: boolean = true;
}

// control: InputSignal<any> = input();
// typeInput: InputSignal<string> = input('');
// idInput: InputSignal<string> = input('');
// element: InputSignal<string> = input('input');
// labelInput: InputSignal<string> = input('');
// flag: WritableSignal<boolean> = signal(true);
