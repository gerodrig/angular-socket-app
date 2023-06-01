import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';
import { MessageResponse } from 'src/app/interfaces/serverResponse.interface';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
  id: string = '';
  message = '';
  messages: any[] = [];
  element: HTMLElement | null = null;

  chatSubscription: Subscription = new Subscription();
  privateChatSubscription: Subscription = new Subscription();
  // idSubscription: Subscription = new Subscription();

  constructor(
    private chatService: ChatService,
    public wsService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.element = document.getElementById('chat-messages');

    this.wsService.requestUserId().then((id: string) => {
      this.id = id;
      console.log(this.id)
    });

    this.chatSubscription = this.chatService
      .getMessages()
      .subscribe((message: MessageResponse) => {
        setTimeout(() => {
          this.messages.push(message);
          console.log(this.messages);
        }, 50);
      });

    this.privateChatSubscription = this.chatService
      .getPrivateMessages()
      .subscribe((message: MessageResponse) => {
        setTimeout(() => {
          this.messages.push(message);
          console.log(this.messages);
        }, 50);
      });
  }

  ngAfterViewChecked(): void {
    //scroll to bottom when new message is received
    if (this.element) {
      this.element.scrollTop = this.element.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    this.chatSubscription.unsubscribe();
    // this.idSubscription.unsubscribe();
  }

  sendMessage() {
    if (this.message.trim().length === 0) return;

    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
