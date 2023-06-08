import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent {

  constructor(private router: Router) { }

  login(number: string){

    //convert string and check if its a number or field is empty
    if(number.trim().length === 0) return;
    
    if(isNaN(Number(number))){
      Swal.fire('Error', 'Please make sure to enter a desktop nubmer', 'error');
    } else {
      //redirect to desktop
      this.router.navigate(['/queues/desktop', number]);
    }

  }

}
