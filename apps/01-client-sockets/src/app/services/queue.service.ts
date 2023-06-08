import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Ticket } from '../interfaces/ticket.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  constructor(public wss: WebsocketService) {}

  getAssignedTickets(): Promise<Ticket[]> {
    return this.wss.getAllticketsAssigned();
  }

  assignNextTicket(desktopNumber: number) {
    this.wss.emit('assign-next-ticket', desktopNumber);
    this.getAssignedTickets();
  }

  emitDesktopAssigned(desktopNumber: number) {
    this.wss.emit('desktop-assigned', desktopNumber);
  }

  listenToDesktopAssigned(): Observable<Ticket> {
    return this.wss.listen('desktop-assigned');
  }

  listenToTicketsAssigned(): Observable<Ticket[]> {
    return this.wss.listen('all-tickets-assigned');
  }
}
