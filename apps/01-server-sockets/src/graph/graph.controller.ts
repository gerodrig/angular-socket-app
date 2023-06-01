import { GraphPollDto } from './../dtos/graph-poll.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { GraphService } from './graph.service';
import { GraphDto } from '@/dtos/graph.dto';
import { PollService } from './poll.service';

@Controller('graph')
export class GraphController {
  constructor(
    private graphService: GraphService,
    private pollService: PollService,
  ) {}

  @Get()
  getGraphData() {
    return this.graphService.getGraphData();
  }

  @Post()
  postGraphData(@Body() body: GraphDto) {
    const { month, value } = body;
    return this.graphService.increaseValue(month, +value);
  }

  @Get('poll')
  pollGraphData() {
    return this.pollService.getPollData();
  }

  @Post('poll')
  postPollGraphData(@Body() body: GraphPollDto) {
    const { label } = body;
    return this.pollService.increaseVote(label);
  }
}
