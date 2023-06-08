import {
  Component,
  OnDestroy,
  OnInit,
  Renderer2,
  AfterViewInit,
} from '@angular/core';
import { Ticket } from '../../../interfaces/ticket.interface';
import { QueueService } from '../../../services/queue.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css'],
})
export class PublicComponent implements OnInit, OnDestroy, AfterViewInit {
  lastTicketAssigned: Ticket | undefined;
  restTicketsAssigned: Ticket[] = [];
  areTicketsAssigned: boolean = false;
  private queueServiceSub$: Subscription | undefined;
  constructor(public queueService: QueueService, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.setStyle(document.body, 'width', '100%');
    this.renderer.setStyle(document.body, 'height', '100%');
    this.renderer.setStyle(document.body, 'margin', '0');
    this.renderer.setStyle(document.body, 'padding', '0');
    this.renderer.setStyle(document.body, 'background-color', '#6951F0');
    this.renderer.setStyle(document.documentElement, 'display', 'flex');
    this.renderer.setStyle(
      document.documentElement,
      'justify-content',
      'center'
    );

    this.renderer.setStyle(document.documentElement, 'width', '100%');
    this.renderer.setStyle(document.documentElement, 'height', '100%');
    this.renderer.setStyle(document.documentElement, 'margin', '0');
    this.renderer.setStyle(document.documentElement, 'padding', '0');
    this.renderer.setStyle(
      document.documentElement,
      'flex-direction',
      'column'
    );
    this.renderer.setStyle(
      document.documentElement,
      'background-color',
      '#6951F0'
    );
    this.renderer.setStyle(document.documentElement, 'align-items', 'center');

    console.log('running after view init')
    
    this.queueService.getAssignedTickets().then((tickets: Ticket[]) => {
      this.assignTickets(tickets);
    });
  }

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('container');

    //get all tickets assigned from the backend
      this.queueServiceSub$ = this.queueService
        .listenToTicketsAssigned()
        .subscribe((tickets: Ticket[]) => {
          this.assignTickets(tickets);
        });

      console.log('runing on init')
  }

  ngOnDestroy(): void {
    this.queueServiceSub$?.unsubscribe();
  }

  assignTickets(tickets: Ticket[]){
    if (tickets.length > 0) {
      this.areTicketsAssigned = true;
      this.lastTicketAssigned = tickets.at(-1);
      this.restTicketsAssigned = tickets.slice(0, -1);
    } else {
      this.areTicketsAssigned = false;
      this.lastTicketAssigned = undefined;
      this.restTicketsAssigned = [];
    }
  }

}
