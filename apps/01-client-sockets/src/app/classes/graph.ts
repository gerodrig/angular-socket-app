
interface GraphDataInterface {
    data: number[];
    label: string;
}


export class GraphData {
    private months = [
        'january',
        'february',
        'march',
        'april',
    ];
    private values: number[] = [1,2,3,4];

  constructor( ) { }

  getGraphData(): GraphDataInterface[]{
    return [
        { data: this.values, label: "Sales" },
      ];
  }

  increaseValue(month: string , value: number): GraphDataInterface[]{
    const index = this.months.indexOf(month.toLowerCase().trim());
    this.values[index] += value;

    return this.getGraphData();
  }
}