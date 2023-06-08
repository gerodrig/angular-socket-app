import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Subject, Observable } from 'rxjs';
import { User } from '../classes/user';
import { Router } from '@angular/router';
import { Ticket } from '../interfaces/ticket.interface';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  public socketStatus = false;
  public clientId$ = new Subject<string>();
  public user: User | null = null;

  constructor(private socket: Socket, private router: Router) {
    this.getUserFromLocalStorage();
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
      this.socketStatus = true;
      this.getUserFromLocalStorage();
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
      this.socketStatus = false;
    });

    //get client id from server event client-id
    this.socket.on('client-id', (clientId: string) => {
      // console.log({ clientId });
      this.clientId$.next(clientId);
    });
  }

  emit(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  listen(payload: string): Observable<any> {
    return this.socket.fromEvent(payload);
  }

  loginWs(name: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.socket.emit('set-user', { name }, (response: any) => {
        this.user = new User(response.id, name);
        this.saveUserInLocalStorage();
        resolve();
      });
    });
  }

  logoutWs() {
    this.user = null;
    localStorage.removeItem('user');
    this.emit('set-user', { name: 'guest' }, () => {});
    this.router.navigateByUrl('/');
  }

  requestUserId(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.emit('client-id', null, (clientId: string) => {
        resolve(clientId);
      });
    });
  }

  getUser() {
    return this.user;
  }

  saveUserInLocalStorage() {
    localStorage.setItem('user', JSON.stringify(this.user));
  }

  getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    if (user) {
      this.user = JSON.parse(user);
      // console.log({ user: this.user });
      this.loginWs(this.user!.name);
    }
  }

  getAllticketsAssigned(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.emit('get-all-tickets-assigned', null, (tickets: Ticket[]) => {
        resolve(tickets);
      });
    });
  }
}
