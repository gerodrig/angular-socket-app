import { Module } from '@nestjs/common';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { GraphController } from './graph/graph.controller';
import { MessagesService } from './message/message.service';

import { MessagesWsModule } from './messages-ws/messages-ws.module';
import { GraphService } from './graph/graph.service';
import { PollService } from './graph/poll.service';
import { UsersModule } from './users/users.module';
import { MessagesController } from './message/message.controller';
import { MapsService } from './maps/maps.service';
import { MapsModule } from './maps/maps.module';
import { QueuesModule } from './queues/queues.module';

@Module({
  imports: [
    MessagesWsModule,
    UsersModule,
    MapsModule,
    QueuesModule,
    //serve Static only in production
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../', '01-client-sockets/dist'),
    // }),
  ],
  controllers: [AppController, MessagesController, GraphController],
  providers: [
    AppService,
    MessagesService,
    GraphService,
    PollService,
    MapsService,
  ],
})
export class AppModule {}
