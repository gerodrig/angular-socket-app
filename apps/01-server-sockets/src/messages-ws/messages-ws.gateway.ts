import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
// import { MessagesWsService } from './messages-ws.service';
import { UsersService } from '@/users/users.service';
import { MapsService } from '@/maps/maps.service';
import { QueuesService } from '@/queues/queues.service';

import { MarkerDto } from '../dtos/marker.dto';
import { NewMessageDto } from '@/dtos/message.dto';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(
    private readonly users: UsersService,
    private maps: MapsService,
    private queues: QueuesService,
  ) {}
  handleConnection(client: Socket) {
    //? Connect client
    this.users.connectUser(client);

    //send id to client
    client.emit('client-id', client.id);
  }

  handleDisconnect(client: Socket) {
    this.users.deleteUser(client.id);

    //emit list of users after a client disconnects
    this.wss.emit('active-users', this.users.getUserListNames());
  }

  async emitPrivateMessage(id: string, message: NewMessageDto) {
    this.wss.to(id).emit('private-message-from-server', { message });
    console.log('private message sent');
  }

  async emitGeneralMessage(message: NewMessageDto) {
    console.log('general message sent');
    console.log(message);
    this.wss.emit('message-from-server', message);
  }

  async emit(event: string, data: any) {
    this.wss.emit(event, data);
  }

  async broadcast(event: string, data: any) {
    this.wss.emit(event, data);
  }

  //listen to messages from client
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: NewMessageDto) {
    const { name, isPrivate, ...rest } = payload[0];
    //TODO: check if message is private

    //? message-from-server to client
    this.wss.emit('message-from-server', {
      ...rest,
      id: client.id,
      from: name,
      isPrivate,
    });

    //? Emit to all clients except the sender
    // client.broadcast.emit('message-from-server', {
    //   message: `${client.id} says: ${payload.message}`,
    // });
  }

  @SubscribeMessage('set-user')
  async handleSetClient(client: Socket, payload: { name: string }) {
    //? Set user
    this.users.updateName(client.id, payload.name);

    //Emit a list of users when a new client connects
    this.wss.emit('active-users', this.users.getUserListNames());

    return {
      ok: true,
      message: `User ${payload.name} set`,
    };
  }

  @SubscribeMessage('get-users')
  async emitActiveUsers(client: Socket) {
    this.wss.to(client.id).emit('active-users', this.users.getUserListNames());
  }

  @SubscribeMessage('client-id')
  async emitId(client: Socket) {
    return client.id;
  }

  @SubscribeMessage('new-marker')
  async handleNewMarker(client: Socket, payload: MarkerDto) {
    this.maps.addMarker(payload[0]);
    client.broadcast.emit('new-marker', payload[0]);
  }

  @SubscribeMessage('delete-marker')
  async handleDeleteMarker(client: Socket, payload: any) {
    this.maps.deleteMarker(payload[0]);

    //emit to everyone including sender
    client.broadcast.emit('delete-marker', payload[0]);
  }

  @SubscribeMessage('move-marker')
  async handleMoveMarker(client: Socket, payload: any) {
    this.maps.moveMarker(payload[0]);
    //emit to everyone including sender
    client.broadcast.emit('move-marker', payload[0]);
  }

  @SubscribeMessage('new-ticket')
  async handleNewTicket(client: Socket) {
    client.emit('new-ticket', this.queues.createTicket());
  }

  @SubscribeMessage('get-last-ticket-assigned')
  async handleGetLastTicketAssigned(client: Socket) {
    client.emit('last-ticket-assigned', this.queues.getLastTicketCreated());
  }

  @SubscribeMessage('desktop-assigned')
  async handleDesktopAssigned(client: Socket, payload: any) {
    const ticket = this.queues.findAssigned(payload[0]);

    if (ticket) {
      //emit just to the client
      client.emit('desktop-assigned', ticket);
      client.emit('all-tickets-assigned', this.queues.getAssignedTickets());
    } else {
      client.emit('desktop-assigned', null);
      client.emit('all-tickets-assigned', this.queues.getAssignedTickets());
    }
  }

  @SubscribeMessage('assign-next-ticket')
  async handleAssignNextTicket(client: Socket, payload: any) {
    const ticket = this.queues.NextTicket(payload[0]);
    console.log(ticket);

    if (ticket) {
      client.emit('desktop-assigned', ticket);
      this.handleGetAllTicketsAssigned(client);
    } else {
      client.emit('desktop-assigned', null);
      this.handleGetAllTicketsAssigned(client);
    }
  }

  @SubscribeMessage('get-all-tickets-assigned')
  async handleGetAllTicketsAssigned(client: Socket) {
    const allTickets = this.queues.getAssignedTickets();
    client.broadcast.emit('all-tickets-assigned', allTickets);

    return allTickets;
  }
}
