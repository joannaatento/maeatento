import { Component, OnInit} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Auth } from '@angular/fire/auth';
import { Database,ref, update, remove} from '@angular/fire/database';
import { Router } from '@angular/router';
import 'firebase/compat/database'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  users!: Observable<any[]>;
  constructor(public auth: Auth,public database: Database, private db: AngularFireDatabase,private router:Router) {
    this.users = db.list('/users').valueChanges();
   }
   
  ngOnInit(): void {


  }


  del(value: any){
    remove(ref(this.database, 'users/' + value));
    alert('Deleted Successfully')
  }

   update(value:any){
 
    update(ref(this.database, 'users/' + value.username), {
       password: value.password
     }); 
    alert('User updated!');
      
  }


  username = '';
  fillForm(username: any) {
    this.username = username;
  }



  password: any;
  itemId: any;

}