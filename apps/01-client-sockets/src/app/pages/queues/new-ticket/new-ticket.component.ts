import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/interfaces/ticket.interface';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-new-ticket',
  templateUrl: './new-ticket.component.html',
  styles: [
    `
    h3{
      font-size: 80px;
      color: white;
    }
    table {
      width: 100%;
      height: 100%;
      text-align: center;
    }
    
    #newTicket {
      font-size: 70px;
      color: white;
    }
    `
  ],
})
export class NewTicketComponent implements OnInit, OnDestroy{
  lastTicketCreated: Ticket | undefined;
  ticketSubscription$: Subscription | undefined;
  lasTicketSubscription$: Subscription | undefined;
  
  constructor(private wss: WebsocketService) {}
  
  ngOnInit(): void {
  //TODO: Get the last ticket assigned from the backend subscribe to the event\
    this.wss.emit('get-last-ticket-assigned');

    this.ticketSubscription$ = this.wss.listen('new-ticket').subscribe((ticket: Ticket) => {
      console.log(ticket);
      this.lastTicketCreated = ticket;
    });

    this.lasTicketSubscription$ = this.wss.listen('last-ticket-assigned').subscribe((lastTicket: Ticket) => {
      this.lastTicketCreated = lastTicket;
    });
  }

  ngOnDestroy(): void {
    this.ticketSubscription$?.unsubscribe();
    this.lasTicketSubscription$?.unsubscribe();
  }

  //TODO: Implemetn create new ticket method
  createTicket() {
    this.wss.emit('new-ticket');

    //TODO: emit new ticket event with the new ticket number
    this.wss.emit('get-last-ticket-assigned');
  }
}
