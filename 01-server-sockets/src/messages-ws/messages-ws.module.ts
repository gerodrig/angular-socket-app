import { Module } from '@nestjs/common';
import { MessagesWsGateway } from './messages-ws.gateway';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [MessagesWsGateway],
  exports: [MessagesWsGateway],
})
export class MessagesWsModule {}
