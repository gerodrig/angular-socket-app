import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styles: [],
})
export class PollComponent implements OnInit {
  message: string = 'Vote once!';
  isVotingAllowed: boolean = true;

  barChartData: Array<any> = [
    { data: [8, 0, 0, 0], label: 'pri' },
    { data: [0, 8, 0, 0], label: 'pan' },
    { data: [0, 0, 8, 0], label: 'prd' },
    { data: [0, 0, 0, 9], label: 'morena' },
  ];

  barChartLabels: Array<any> = ['pri', 'pan', 'prd', 'morena'];

  constructor(private http: HttpClient, public wsService: WebsocketService) {}

  ngOnInit(): void {
    if (localStorage.getItem('voted')) {
      this.message = 'Thanks for submitting your vote!';
      this.isVotingAllowed = false;
    }
    this.getData();
    this.listenSocket();
  }

  getData() {
    this.http.get('http://localhost:5001/graph/poll').subscribe((data: any) => {
      this.barChartData = data;
    });
  }

  listenSocket() {
    this.wsService.listen('poll-data').subscribe((data: any) => {
      console.log('socket', data);
      this.barChartData = data;
    });
  }

  vote(selection: string) {
    
    if (!this.isVotingAllowed) {
      return;
    }
    this.http.post('http://localhost:5001/graph/poll', {
      label: selection,
    }).subscribe(() => {
      localStorage.setItem('voted', 'true');
      this.message = 'You already voted!';
      this.isVotingAllowed = false;
      // save in local storage
      console.log('voted');

    });

  }
}
