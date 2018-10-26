import { GoogleChartsBaseService } from './google-charts.base.service';
import { Injectable } from '@angular/core';
import { PieChartConfig } from './../Models/PieChartConfig';

declare var google: any;

@Injectable()
export class GooglePieChartService extends GoogleChartsBaseService {

  constructor() { super(); }

  public BuildPieChart(elementId: String, data: any[], config: PieChartConfig) : void {  
    var chartFunc = () => { return new google.visualization.PieChart(document.getElementById(<string>elementId)); };
    var options = {
            title: config.title,
            pieHole: config.pieHole,
            'backgroundColor': 'transparent',
            'chartArea': {'width': '100%', 'height': '80%'},
            'colors': ['#ef0404', '#3552e0', '#9823a3', '#f9f502', '#0ab223','#efab34']
            //legend: { position: 'bottom', alignment: 'end',textStyle: {fontSize: 11} }
      };

    this.buildChart(data, chartFunc, options);
  }
}