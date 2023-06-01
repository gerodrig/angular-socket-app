import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesController } from './message/message.controller';
import { MessagesService } from './message/message.service';
import { MessagesWsModule } from './messages-ws/messages-ws.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { GraphController } from './graph/graph.controller';
import { GraphService } from './graph/graph.service';
import { PollService } from './graph/poll.service';

@Module({
  imports: [MessagesWsModule, UsersModule],
  controllers: [
    AppController,
    MessagesController,
    UsersController,
    GraphController,
  ],
  providers: [AppService, MessagesService, GraphService, PollService],
})
export class AppModule {}
