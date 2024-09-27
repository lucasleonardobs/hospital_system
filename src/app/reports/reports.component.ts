import { Component, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.sass'],
})
export class ReportsComponent implements OnInit {
  @ViewChild('chart') chart: any = ChartComponent;
  public chartOptionsAvgPatientsAvg!: Partial<ChartOptions> | any;
  public chartOptionsVisitsAvg!: Partial<ChartOptions> | any;
  public showSecondDoctor: boolean = false;
  public firstDoctor: any = '';
  public secondDoctor: any = '';

  toggleCompareDoctor(): void {
    this.showSecondDoctor = !this.showSecondDoctor;
    if (this.showSecondDoctor) this.secondDoctor = '';
  }

  saveReports(): void {
    window.print();
  }

  public doctorsList = [
    {
      label: 'Dr. Matheus',
      id: 1,
      patientsAvg: [20, 31, 22, 23, 13.2, 23.3, 12.2],
      prioritiesAvg: [25.3, 11, 4],
    },
    {
      label: 'Dr. Wesley',
      id: 2,
      patientsAvg: [13, 21.2, 13.2, 22, 22.1, 36, 32],
      prioritiesAvg: [33.2, 15, 7],
    },
    {
      label: 'Dr. Lucas',
      id: 3,
      patientsAvg: [10, 21, 12, 33, 43.1, 33.3, 22.2],
      prioritiesAvg: [22.3, 10.3, 4.2],
    },
    {
      label: 'Dr. Hael',
      id: 4,
      patientsAvg: [14, 21.6, 13.1, 23.4, 23.1, 12.3, 12.4],
      prioritiesAvg: [31.3, 11.3, 2.3],
    },
    {
      label: 'Dr. Tomas',
      id: 5,
      patientsAvg: [15, 25.1, 17, 23.3, 33.1, 21.3, 17.2],
      prioritiesAvg: [22.3, 6.3, 3.7],
    },
  ];

  selectedDoctor: string = '';

  doctorOptions = {
    first: this.doctorsList,
    second: this.doctorsList,
  };
  public patientsAvg: any = [];
  public prioritiesAvg: any = [];

  setChartSeriesData({ position }: { position: 'first' | 'second' }): any {
    const patientsAvgData = this.doctorOptions[position].find(
      (el) => el.label === this[`${position}Doctor`].label
    );

    this.patientsAvg[position] = [
      {
        name: 'Média de pacientes atendidos',
        data: patientsAvgData?.patientsAvg,
      },
    ];

    this.prioritiesAvg[position] = [
      {
        name: 'Média de pacientes por prioridde',
        data: patientsAvgData?.prioritiesAvg,
      },
    ];
  }

  setFirstDoctor(event: MatSelectChange): void {
    this.firstDoctor = event.value;
    if (!this.secondDoctor) {
      this.doctorOptions.second = this.doctorOptions.second.filter(
        (el) => el !== this.firstDoctor
      );
    }

    this.setChartSeriesData({ position: 'first' });
  }
  setSecondDoctor(event: MatSelectChange): void {
    this.setChartSeriesData({ position: 'second' });
  }
  resetDoctors(): void {
    this.firstDoctor = '';
    this.secondDoctor = '';
    this.doctorOptions.first = this.doctorsList
    this.doctorOptions.second = this.doctorsList
    this.showSecondDoctor = false;
  }
  constructor() {
    this.chartOptionsAvgPatientsAvg = {
      chart: {
        height: '320px',
        width: '320px',
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val;
        },
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },

      xaxis: {
        categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
        position: 'top',
        labels: {},
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      fill: {
        colors: ['#303f9f'],
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: any) {
            return val;
          },
        },
      },
      title: {
        text: 'Média de pacientes atendidos por dia',
        floating: false,
        align: 'center',
        style: {
          fontWeight: 'light',
          color: '#444',
        },
      },
    };

    this.chartOptionsVisitsAvg = {
      chart: {
        height: '320px',
        width: '320px',
        type: 'bar',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val;
        },
        style: {
          fontSize: '12px',
          colors: ['#fff'],
        },
      },

      xaxis: {
        categories: ['Baixa', 'Média', 'Alta'],
        position: 'top',
        labels: {},
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      fill: {
        colors: ['#303f9f'],
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: any) {
            return val;
          },
        },
      },
      title: {
        text: 'Média de pacientes atendidos por pririodidade',
        floating: false,
        align: 'center',
        style: {
          fontWeight: 'light',
          fontSize: 12,
          color: '#444',
        },
      },
    };
  }

  ngOnInit(): void {}
}
