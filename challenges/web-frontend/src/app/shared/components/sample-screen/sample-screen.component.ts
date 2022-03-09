import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cos-sample-screen',
  templateUrl: './sample-screen.component.html',
  styleUrls: ['./sample-screen.component.scss'],
})
export class SampleScreenComponent {
  readonly routeData: Record<string, string>;

  constructor(private route: ActivatedRoute) {
    this.routeData = this.route.snapshot.data;
  }
}
