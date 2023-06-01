export class GraphPollData {
  private _label = ['pri', 'pan', 'prd', 'morena'];
  private _values: number[][] = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  private _graphName = 'Poll';

  getGraphPollData() {
    const data = [];

    this._label.forEach((label, index) => {
      data.push({ data: this._values[index], label });
    });

    return data;
  }

  increaseVote(label: string) {
    const index = this._label.indexOf(label.toLowerCase().trim());
    this._values[index][index] += 1;

    return this.getGraphPollData();
  }

  set graphName(name: string) {
    this._graphName = name;
  }
}
