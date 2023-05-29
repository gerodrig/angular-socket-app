import { Module } from '@nestjs/common';
import { MessagesWsService } from './messages-ws.service';
import { MessagesWsGateway } from './messages-ws.gateway';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [MessagesWsGateway, MessagesWsService],
  exports: [MessagesWsGateway],
})
export class MessagesWsModule {}
