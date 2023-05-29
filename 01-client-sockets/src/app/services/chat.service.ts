import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable } from 'rxjs';
import { MessageResponse } from '../interfaces/serverResponse.interface';
import { Message } from '../classes/message';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(public wsService: WebsocketService) {}

  sendMessage(message: string) {
    const name = this.wsService.getUser()?.name ?? 'Guest';

    const msg = new Message(name, message, );
    this.wsService.emit('message', msg);
  }

  getMessages(): Observable<MessageResponse> {
    return this.wsService.listen('message-from-server');
  }

  getPrivateMessages(): Observable<MessageResponse> {
    return this.wsService.listen('private-message-from-server');
  }

  getClientId(): Promise<string> {
    return this.wsService.requestUserId();
  }

  getActiveUsers() {
    return this.wsService.listen('active-users');
  }

  emitActiveUsers() {
    //emit event 'active users' with no payload and receive list of users.
    this.wsService.emit('get-users');
  }

}
