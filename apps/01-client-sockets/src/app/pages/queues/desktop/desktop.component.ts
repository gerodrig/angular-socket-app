import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ticket } from '../../../interfaces/ticket.interface';
import { QueueService } from 'src/app/services/queue.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styles: [
    `
    #desktop {
      color: white;
    }

    button {
      font-size: 30px;
      margin: 10px;
    }
    `
  ]
})
export class DesktopComponent implements OnInit, AfterViewInit {

  desktopNumber: number | undefined;
  isDesktopAssigned: boolean = false;
  ticketAssigned: Ticket | undefined;

  constructor(private router: Router, public queueService: QueueService, private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    this.renderer.setStyle(document.body, 'width', '100%');
      this.renderer.setStyle(document.body, 'height', '100%');
      this.renderer.setStyle(document.body, 'margin', '0');
      this.renderer.setStyle(document.body, 'padding', '0');
      this.renderer.setStyle(document.body, 'background-color', '#6951F0');
      this.renderer.setStyle(document.documentElement, 'display', 'flex');
      this.renderer.setStyle(document.documentElement, 'justify-content', 'center');
      
      this.renderer.setStyle(document.documentElement, 'width', '100%');
      this.renderer.setStyle(document.documentElement, 'height', '100%');
      this.renderer.setStyle(document.documentElement, 'margin', '0');
      this.renderer.setStyle(document.documentElement, 'padding', '0');
      this.renderer.setStyle(document.documentElement, 'flex-direction', 'column');
      this.renderer.setStyle(document.documentElement, 'background-color', '#6951F0');
      this.renderer.setStyle(document.documentElement, 'align-items', 'center');
  }

  ngOnInit(): void {
    //get desktop number from path :id
    this.desktopNumber = Number(this.router.url.split('/')[3]); 

    this.queueService.emitDesktopAssigned(this.desktopNumber as number);

    this.queueService.listenToDesktopAssigned().subscribe((desktop: Ticket) => {
      if(desktop){
        this.isDesktopAssigned = true;
        this.ticketAssigned = desktop;
      } else {
        this.isDesktopAssigned = false;
        this.ticketAssigned = undefined;
      }

    });
  }

  assignNextTicket(){
    this.queueService.assignNextTicket(this.desktopNumber as number);
  }

}
