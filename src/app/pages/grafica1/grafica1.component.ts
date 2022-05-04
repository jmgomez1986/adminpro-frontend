import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component implements OnInit {
  // Doughnut
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels1: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];
  public doughnutChartData1: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels1,
    datasets: [
      {
        data: [350, 450, 100],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      },
    ],
  };

  public doughnutChartLabels2: string[] = [
    'Pan',
    'Leche',
    'Azucar',
  ];
  public doughnutChartData2: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels2,
    datasets: [
      {
        data: [50, 350, 125],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      },
    ],
  };

  public doughnutChartLabels3: string[] = [
    'Comprar atun',
    'Pasear al perro',
    'Ir al Gimnasio',
  ];
  public doughnutChartData3: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels3,
    datasets: [
      {
        data: [10, 5, 300],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      },
    ],
  };

  public doughnutChartLabels4: string[] = [
    'JavaScript',
    'Angular',
    'React',
  ];
  public doughnutChartData4: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels4,
    datasets: [
      {
        data: [755, 850, 300],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'],
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
