import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
// import { MessagesWsService } from './messages-ws.service';
import { NewMessageDto } from '@/dtos/message.dto';
import { UsersService } from '@/users/users.service';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly users: UsersService) {}
  handleConnection(client: Socket) {
    //? Connect client
    this.users.connectUser(client);

    //send id to client
    client.emit('client-id', client.id);
  }

  handleDisconnect(client: Socket) {
    this.users.deleteUser(client.id);
    console.log({ connected: this.users.getUserListNames() });

    //emit list of users after a client disconnects
    this.wss.emit('active-users', this.users.getUserListNames());
  }

  //listen to messages from client
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: NewMessageDto, cb?: any) {
    const { name, isPrivate, ...rest } = payload[0];
    //TODO: check if message is private

    //? message-from-server to client
    // console.log({});
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
  async emitId(client: Socket, payload: any, cb?: (response: any) => void) {
    return client.id;
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

  test() {
    console.log('test');
  }
}
