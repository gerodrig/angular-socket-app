import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  name: string = '';
  formError: boolean = false;

  constructor(public wsService: WebsocketService, private router: Router) {}

  login() {
    this.wsService.loginWs(this.name.trim()).then(() => {
      this.router.navigateByUrl('/messages');
    });
  }
}
