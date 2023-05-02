import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterPipe } from './pipes/filter.pipe';
import { AnchorDirective } from './anchor.directive';
import { AlertComponent } from './alert/alert.component';
import { HumanizationTextPipe } from './pipes/humanization-text.pipe';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FilterPipe,
    AlertComponent,
    AnchorDirective,
    HumanizationTextPipe,
    LoadingSpinnerComponent,
  ],
  exports: [
    FilterPipe,
    CommonModule,
    AlertComponent,
    AnchorDirective,
    HumanizationTextPipe,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
