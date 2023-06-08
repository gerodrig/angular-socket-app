import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { WebsocketService } from 'src/app/services/websocket.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  public lineChartData: Array<any> = [
    { data: [65, 59, 80, 81], label: "Sales" },
  ];

  public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April'];

  constructor(private http: HttpClient, public wsService: WebsocketService) { } 

ngOnInit(): void {
  this.getData();
  this.listenSocket();
}

getData(){
  this.http.get(`${environment.wsUrl}/graph`)
    .subscribe((data: any) => this.lineChartData = data);
}

listenSocket(){
  this.wsService.listen('graph-data')
    .subscribe((data: any) => {
      console.log('socket', data);
      this.lineChartData = data;
    });
}

}
