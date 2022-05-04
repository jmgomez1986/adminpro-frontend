import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit {
  @Input() title: string = '';
  @Input() data: any = {};
  @Input() labels: string[] = [];
  @Input() type: any;

  constructor() { }

  ngOnInit(): void {
  }

}
