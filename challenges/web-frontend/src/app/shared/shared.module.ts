import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { LayoutComponent } from './components/layout/layout.component';
import { SampleScreenComponent } from './components/sample-screen/sample-screen.component';

import { TimeLeftPipe } from './pipes/time-left.pipe';

@NgModule({
  declarations: [LayoutComponent, SampleScreenComponent, TimeLeftPipe],
  imports: [CommonModule, RouterModule, MatButtonModule],
  exports: [LayoutComponent, TimeLeftPipe],
})
export class SharedModule {}
