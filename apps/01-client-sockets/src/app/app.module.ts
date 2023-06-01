import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

//sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

//charts module
import { NgChartsModule } from 'ng2-charts';


const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { FooterComponent } from './components/footer/footer.component';
import { ChatComponent } from './components/chat/chat.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { LoginComponent } from './pages/login/login.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { GraphComponent } from './components/graph/graph.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PollComponent } from './pages/poll/poll.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ChatComponent,
    UsersListComponent,
    LoginComponent,
    MessagesComponent,
    GraphComponent,
    DashboardComponent,
    PollComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    NgChartsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
