import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

//sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';


//Modules
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot(config),
    AppRoutingModule,
    HttpClientModule,
    ComponentsModule,
    PagesModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
