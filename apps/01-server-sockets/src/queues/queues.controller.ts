import { Controller, Get, HttpException, Param, Post } from '@nestjs/common';
import { QueuesService } from './queues.service';
// import { CreateQueueDto } from './dto/create-queue.dto';
// import { UpdateQueueDto } from './dto/update-queue.dto';

@Controller('queues')
export class QueuesController {
  constructor(private readonly queuesService: QueuesService) {}

  @Get()
  findAll() {
    return this.queuesService.getLastTicketCreated();
  }

  @Post()
  create() {
    return this.queuesService.createTicket();
  }

  //Assing ticket to desktop get desktop number from params /:desktop
  @Post('/:desktop')
  // @Param transform to number
  assignNextTicket(@Param('desktop') desktop: number) {
    if (isNaN(desktop)) {
      throw new HttpException('Desktop must be a number', 400);
    }
    return this.queuesService.NextTicket(desktop);
  }
}
