export class User {

    constructor(private _clientId: string, public name: string, ){}

    get id() {
        return this._clientId;
    }
}