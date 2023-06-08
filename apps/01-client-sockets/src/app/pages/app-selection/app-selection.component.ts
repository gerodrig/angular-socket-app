import { Component } from '@angular/core';

interface App {
  title: string;
  description: string;
  link: string;
}

@Component({
  selector: 'app-app-selection',
  templateUrl: './app-selection.component.html',
  styles: [
  ]
})
export class AppSelectionComponent {

  apps: App[] = [
    {
    title: 'Messages',
    description: 'Send messages to other users',
    link: '/messages'
    },
    {
    title: 'Dashboard',
    description: 'View and manage your data',
    link: '/dashboard'
    },
    {
    title: 'Poll',
    description: 'Create and manage polls',
    link: '/poll'
    },
    {
    title: 'Maps',
    description: 'View and manage maps',
    link: '/maps'
    },
    {
    title: 'Queues',
    description: 'View and manage queues',
    link: '/queues'
    },
  ]

}
