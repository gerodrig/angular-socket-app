import { UserDto } from '@/dtos/user.dto';
import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class UsersService {
  private _list: UserDto[] = [];

  //Add User
  public add(user: UserDto) {
    this._list.push(user);
  }

  public connectUser(client: Socket): void {
    const user = new UserDto();
    user.id = client.id;
    this.add(user);
    this.getUserList();
  }

  public updateName(id: string, name: string): void {
    for (const user of this._list) {
      if (user.id === id) {
        user.name = name;
        break;
      }
    }

    // console.log('=== User updated ===');
  }

  public getUserList() {
    return this._list;
  }
  public getUserListNames(): UserDto[] {
    const users = this._list.filter((user) => user.name !== 'guest');
    return users;
  }

  public getUser(id: string): UserDto {
    return this._list.find((user) => user.id === id);
  }

  public getUsersInRoom(room: string): UserDto[] {
    return this._list.filter((user) => user.room === room);
  }

  public deleteUser(id: string): UserDto {
    const tempUser = this.getUser(id);
    this._list = this._list.filter((user) => user.id !== id);
    return tempUser;
  }
}
