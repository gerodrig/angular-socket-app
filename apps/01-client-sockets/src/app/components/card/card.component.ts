import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() link: string = '/';

}
