export class GraphData {
  private months = ['january', 'february', 'march', 'april'];
  private values: number[] = [1, 2, 3, 4];

  getGraphData() {
    return [{ data: this.values, label: 'Sales' }];
  }

  increaseValue(month: string, value: number) {
    const index = this.months.indexOf(month.toLowerCase().trim());
    this.values[index] += value;

    return this.getGraphData();
  }
}
