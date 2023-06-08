import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NewMessageDto } from '@/dtos/message.dto';
import { ResponseMessage } from '@/interfaces/message.interface';
import { MessagesService } from './message.service';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}
  @Get()
  getMessages(): ResponseMessage {
    return this.messageService.findAll();
  }

  @Get(':id')
  getMessage(@Param('id') id: string): ResponseMessage {
    return this.messageService.findOne(id);
  }

  @Post()
  generalMessage(@Body() newMessage: NewMessageDto): ResponseMessage {
    //get id from params
    return this.messageService.newGeneralMessage(newMessage);
  }
  @Post(':id')
  privateMessage(
    @Body() newMessage: NewMessageDto,
    @Param('id') id: string,
  ): ResponseMessage {
    //get id from params
    return this.messageService.newPrivateMessage(newMessage, id);
  }
}
