import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroModule} from "@modules/ng-zorro";
import {InvoiceStatusComponent, ItemSelectionDrawerComponent, LineItemsFormComponent} from "../shared/components";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    InvoiceStatusComponent,
    ItemSelectionDrawerComponent,
    LineItemsFormComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    InvoiceStatusComponent,
    ItemSelectionDrawerComponent,
    LineItemsFormComponent
  ]
})
export class SharedModule { }
