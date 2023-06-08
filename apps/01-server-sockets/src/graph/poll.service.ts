import { GraphPollData } from '@/classes/graph/graph-poll';
import { MessagesWsGateway } from '@/messages-ws/messages-ws.gateway';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class PollService {
  private _pollData: GraphPollData = new GraphPollData();

  constructor(private wss: MessagesWsGateway) {}

  getPollData() {
    return this._pollData.getGraphPollData();
  }

  increaseVote(label: string) {
    //check if label is in the list of labels pri, pan prd, morena
    if (!['pri', 'pan', 'prd', 'morena'].includes(label.toLowerCase().trim())) {
      throw new HttpException('Invalid label', 400);
    }

    const data = this._pollData.increaseVote(label);
    this.wss.emit('poll-data', data);

    return data;
  }
}
