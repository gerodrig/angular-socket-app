import { Module } from '@nestjs/common';
import { MessagesWsGateway } from './messages-ws.gateway';
import { UsersModule } from '@/users/users.module';
import { MapsModule } from '@/maps/maps.module';
import { QueuesModule } from '../queues/queues.module';

@Module({
  imports: [UsersModule, MapsModule, QueuesModule],
  providers: [MessagesWsGateway],
  exports: [MessagesWsGateway],
})
export class MessagesWsModule {}
