import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { UserGuard } from './guards/user-guard.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'messages', component: MessagesComponent, canActivate: [UserGuard] },
  { path: '**', component: LoginComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
