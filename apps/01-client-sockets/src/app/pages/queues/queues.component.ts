import { Component, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-queues',
  templateUrl: './queues.component.html',
  styleUrls: ['./queues.component.css']
})
export class QueuesComponent implements AfterViewInit {

constructor(private renderer: Renderer2) { }

ngAfterViewInit(): void {
  this.renderer.setStyle(document.body, 'width', '100%');
    this.renderer.setStyle(document.body, 'height', '100%');
    this.renderer.setStyle(document.body, 'margin', '0');
    this.renderer.setStyle(document.body, 'padding', '0');
    this.renderer.setStyle(document.body, 'background-color', '#6951F0');
    this.renderer.setStyle(document.documentElement, 'display', 'flex');
    this.renderer.setStyle(document.documentElement, 'justify-content', 'center');
    
    this.renderer.setStyle(document.documentElement, 'width', '100%');
    this.renderer.setStyle(document.documentElement, 'height', '100%');
    this.renderer.setStyle(document.documentElement, 'margin', '0');
    this.renderer.setStyle(document.documentElement, 'padding', '0');
    this.renderer.setStyle(document.documentElement, 'flex-direction', 'column');
    this.renderer.setStyle(document.documentElement, 'background-color', '#6951F0');
    this.renderer.setStyle(document.documentElement, 'align-items', 'center');
  }

}
