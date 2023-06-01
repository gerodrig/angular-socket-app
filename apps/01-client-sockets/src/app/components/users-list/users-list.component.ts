import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  activeUsersObservable: Observable<any> = new Observable<any>();
  id: string = '';

  constructor(public chatService: ChatService ) { }

  ngOnInit(): void {
    this.activeUsersObservable = this.chatService.getActiveUsers();

    //Emit get users
    this.chatService.emitActiveUsers();

    this.chatService.getClientId().then((id: string) => {

      this.id = id;
    });

  }


}
