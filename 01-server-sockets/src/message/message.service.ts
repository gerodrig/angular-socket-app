import {
  HttpStatus,
  Injectable,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { Message } from '@/interfaces/message.interface';
import { NewMessageDto } from '@/dtos/message.dto';

import { ResponseMessage } from '@/interfaces/message.interface';
import { MessagesWsGateway } from '@/messages-ws/messages-ws.gateway';

@Injectable()
export class MessagesService {
  private readonly messages: Message[] = [];

  constructor(private readonly messagesWsGateway: MessagesWsGateway) {}

  setMessage(message: Message) {
    const id = (this.messages.length + 1).toString();

    this.messages.push({ ...message, id });
  }

  newGeneralMessage(msg: NewMessageDto): ResponseMessage {
    if (!msg) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'body and from are required in the request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const message = {
      message: msg.message,
      from: msg.from || 'anonymous',
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      isPrivate: false,
      name: 'Admin',
      id: 'Admin',
    };

    this.messagesWsGateway.emitGeneralMessage(message);

    return {
      ok: true,
      message: msg,
    };
  }

  newPrivateMessage(message: NewMessageDto, id: string): ResponseMessage {
    if (!message || !id) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'body and from are required in the request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    this.messagesWsGateway.emitPrivateMessage(id, message);

    return {
      ok: true,
      message,
    };
  }

  findAll() {
    return {
      ok: true,
      message: this.messages,
    };
  }

  findOne(id: string) {
    const message = this.messages.find((message) => message.id === id);

    if (!message) {
      throw new NotFoundException('User not found');
    }

    return {
      ok: true,
      message,
    };
  }
}
