import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


//Modules
import { ComponentsModule } from '../components/components.module';

//components
import { LoginComponent } from './login/login.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PollComponent } from './poll/poll.component';
import { MapComponent } from './map/map.component';
import { QueuesComponent } from './queues/queues.component';
import { NewTicketComponent } from './queues/new-ticket/new-ticket.component';
import { PublicComponent } from './queues/public/public.component';
import { DesktopComponent } from './queues/desktop/desktop.component';
import { HomeComponent } from './queues/home/home.component';
import { AppSelectionComponent } from './app-selection/app-selection.component';



@NgModule({
  declarations: [
    LoginComponent,
    MessagesComponent,
    DashboardComponent,
    PollComponent,
    MapComponent,
    QueuesComponent,
    NewTicketComponent,
    PublicComponent,
    DesktopComponent,
    HomeComponent,
    AppSelectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ComponentsModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    MessagesComponent,
    DashboardComponent,
    PollComponent,
    MapComponent,
  ]
})
export class PagesModule { }
