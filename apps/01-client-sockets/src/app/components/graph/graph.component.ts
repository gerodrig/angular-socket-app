import { Component, Input } from '@angular/core';
import type { ChartTypeRegistry } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
})
export class GraphComponent {
  @Input()
  type: any = 'line';

  @Input()
  width: string = '400';

  @Input()
  height: string = '400';

  @Input()
  public data: Array<any> = [
    { data: [65, 59, 80, 81], label: 'Sales' },
  ];

  @Input()
  public labels: Array<any> = [
    'January',
    'February',
    'March',
    'April',
  ];
}
