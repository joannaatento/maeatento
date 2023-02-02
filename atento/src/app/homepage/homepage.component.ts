import { Component} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Database} from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
 
    constructor(public auth: Auth,public database:Database,private router:Router) { }
  
    ngOnInit(): void {
    }

}
