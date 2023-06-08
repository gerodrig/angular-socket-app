import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { UserGuard } from './guards/user-guard.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PollComponent } from './pages/poll/poll.component';
import { MapComponent } from './pages/map/map.component';
import { DesktopComponent } from './pages/queues/desktop/desktop.component';
import { QueuesComponent } from './pages/queues/queues.component';
import { NewTicketComponent } from './pages/queues/new-ticket/new-ticket.component';
import { PublicComponent } from './pages/queues/public/public.component';
import { AppSelectionComponent } from './pages/app-selection/app-selection.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'app-selection', component: AppSelectionComponent, canActivate: [UserGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [UserGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [UserGuard] },
  { path: 'poll', component: PollComponent, canActivate: [UserGuard] },
  { path: 'maps', component: MapComponent, canActivate: [UserGuard] },
  { path: 'queues', component: QueuesComponent, canActivate: [UserGuard] },
  { path: 'queues/desktop/:id', component: DesktopComponent, canActivate: [UserGuard] },
  { path: 'queues/new-ticket', component: NewTicketComponent, canActivate: [UserGuard]},
  { path: 'queues/public', component: PublicComponent, canActivate: [UserGuard]},
  { path: 'queues/**', component: QueuesComponent, canActivate: [UserGuard]},
  { path: '**', component: LoginComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
