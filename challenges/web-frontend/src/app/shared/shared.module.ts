import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { LayoutComponent } from './components/layout/layout.component';
import { TimeLeftPipe } from './pipes/time-left.pipe';

@NgModule({
  declarations: [LayoutComponent, TimeLeftPipe],
  imports: [CommonModule, RouterModule, MatButtonModule],
  exports: [LayoutComponent, TimeLeftPipe],
})
export class SharedModule {}
