import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, ControlContainer, FormGroup } from '@angular/forms';

@Component({
  selector: 'line-items-form',
  templateUrl: './line-items-form.component.html',
  styleUrls: ['./line-items-form.component.less']
})
export class LineItemsFormComponent {
  @Input() itemsList: any[] = [];
  @Output() itemChanged = new EventEmitter<{ index: number, itemId: any }>();
  @Output() totalsChanged = new EventEmitter<void>();
  @Output() itemRemoved = new EventEmitter<number>();

  constructor(public controlContainer: ControlContainer) {}

  get parentFormGroup(): FormGroup {
    return this.controlContainer.control as FormGroup;
  }

  get lineItems(): FormArray {
    return this.parentFormGroup.get('lineItems') as FormArray;
  }

  onItemChange(index: number, itemId: any): void {
    this.itemChanged.emit({ index, itemId });
  }

  calculateTotals(): void {
    this.totalsChanged.emit();
  }

  removeLineItem(index: number): void {
    this.itemRemoved.emit(index);
  }
}
