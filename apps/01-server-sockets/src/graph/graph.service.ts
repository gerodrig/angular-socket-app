import { Injectable } from '@nestjs/common';
import { GraphData } from '@/classes/graph/graph';
import { MessagesWsGateway } from '@/messages-ws/messages-ws.gateway';

@Injectable()
export class GraphService {
  private _graphData: GraphData = new GraphData();

  constructor(private wss: MessagesWsGateway) {}

  public getGraphData() {
    return this._graphData.getGraphData();
  }

  public increaseValue(month: string, value: number) {
    const data = this._graphData.increaseValue(month, value);
    this.wss.emit('graph-data', data);

    return data;
  }
}
