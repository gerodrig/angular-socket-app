import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//Modules
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

//Components
import { FooterComponent } from './footer/footer.component';
import { ChatComponent } from './chat/chat.component';
import { UsersListComponent } from './users-list/users-list.component';
import { GraphComponent } from './graph/graph.component';
import { MapDisplayComponent } from './map/map.component';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    FooterComponent,
    ChatComponent,
    UsersListComponent,
    GraphComponent,
    MapDisplayComponent,
    CardComponent,
  ],
  exports: [
    FooterComponent,
    ChatComponent,
    UsersListComponent,
    GraphComponent,
    MapDisplayComponent,
    CardComponent,
  ],
  imports: [CommonModule, FormsModule, NgChartsModule, RouterModule],
})
export class ComponentsModule {}
