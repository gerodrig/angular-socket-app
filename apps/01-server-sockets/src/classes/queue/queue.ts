export interface Ticket {
  desktop?: number;
  date: string;
  ticketNumber: number;
}

export class Queue {
  private tickets = new Map<number, Ticket>();
  private assignedTickets = new Map<number, Ticket>();

  //create observable for ticket numbers

  enqueue(): Ticket {
    const ticketNumber = this.tickets.size + 1;
    const date = new Date().toISOString();

    const ticket: Ticket = { desktop: null, date, ticketNumber };

    this.tickets.set(ticketNumber, ticket);

    return ticket;
  }

  dequeueAssigned(desktop: number): void {
    //remove ticket from assigned desktop
    const ticket = this.findAssigned(desktop);

    if (ticket) {
      this.assignedTickets.delete(ticket.ticketNumber);
    }
  }

  assignToDesktop(desktop: number): Ticket | null {
    //find ticket that is not assigned
    const ticket =
      [...this.tickets.values()].find((ticket) => ticket.desktop == null) ||
      null;

    if (ticket) {
      ticket.desktop = desktop;
      this.updateAssignedTickets(ticket);
    }

    return ticket || null;
  }

  assignNextTicket(desktop: number): Ticket | null {
    //check if any ticket is assigned to this desktop
    const ticketAssigned = this.findAssigned(desktop);

    //if there is a ticket assigned dequeue it
    if (ticketAssigned) {
      this.dequeueAssigned(desktop);
    }

    //assign next ticket that is not assigned
    const nextTicket = this.assignToDesktop(desktop);

    return nextTicket || null;
  }

  private updateAssignedTickets(ticket: Ticket): void {
    this.assignedTickets.set(ticket.ticketNumber, ticket);
  }

  getLastFourAssigned(): Ticket[] {
    return [...this.assignedTickets.values()];
  }

  getAllTickets(): Ticket[] {
    return [...this.tickets.values()];
  }

  getAllAssignedTickets(): Ticket[] {
    return [...this.assignedTickets.values()];
  }

  getLastTicket(): Ticket {
    //get the las ticket number from the map
    const lastTicketNumber = Math.max(...this.tickets.keys());
    //get the ticket from the map
    const lastTicket = this.tickets.get(lastTicketNumber) || null;
    //return the ticket
    return lastTicket;
  }

  findAssigned(desktopNumber: number): Ticket | null {
    //find ticket assigned to desktopNumber in assignedTickets

    const ticket =
      [...this.assignedTickets.values()].find(
        (ticket) => ticket.desktop == desktopNumber,
      ) || null;

    return ticket;
  }

  size(): number {
    return this.tickets.size;
  }
}
