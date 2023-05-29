export class Message {
    date: string;
  constructor(
    public name: string,
    public message: string,
    public id: string = '',
    public isPrivate = false
  ) {
    //save date in format yyyy-mm-dd hh:mm:ss to IsoStringlocale
    this.date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }
}
