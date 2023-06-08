import { Injectable } from '@nestjs/common';

import { Queue, type Ticket } from '@/classes/queue/queue';

@Injectable()
export class QueuesService {
  private queue: Queue = new Queue();

  constructor() {
    //create 20 tickets
    for (let i = 0; i < 20; i++) {
      this.queue.enqueue();
    }
  }

  createTicket() {
    return this.queue.enqueue();
  }

  findAll(): Ticket[] {
    return this.queue.getAllTickets();
  }

  getQueueSize(): number {
    return this.queue.size();
  }

  getLastTicketCreated(): Ticket {
    return this.queue.getLastTicket();
  }

  getAssignedTickets(): Ticket[] {
    return this.queue.getAllAssignedTickets();
  }

  NextTicket(desktop: number): Ticket | null {
    return this.queue.assignNextTicket(desktop) || null;
  }

  findAssigned(ticketNumber: number) {
    return this.queue.findAssigned(ticketNumber);
  }

  // update(id: number, updateQueueDto: UpdateQueueDto) {
  //   return `This action updates a #${id} queue`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} queue`;
  // }
}
