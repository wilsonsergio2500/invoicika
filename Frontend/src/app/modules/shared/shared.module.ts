import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroModule} from "@modules/ng-zorro";
import {InvoiceStatusComponent, ItemSelectionDrawerComponent} from "../shared/components";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    InvoiceStatusComponent,
    ItemSelectionDrawerComponent
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    InvoiceStatusComponent,
    ItemSelectionDrawerComponent
  ]
})
export class SharedModule { }
