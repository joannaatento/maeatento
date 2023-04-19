import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, ref, set, update, remove,query,orderByChild,equalTo} from '@angular/fire/database';
import 'firebase/compat/database'
import { Observable } from 'rxjs';



interface Item {
  password: string;
}


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  users!: Observable<any[]>;
  constructor(public database: Database, private db: AngularFireDatabase) {
  this.users = db.list('/users').valueChanges();
   }
   
  ngOnInit(): void {


  }
  del(value: any){
    remove(ref(this.database, 'users/' + value));
    alert('Deleted Successfully')
  }
  email = "";
password = "";
     edit(edits: any) {
       this.email = edits.email;
      this.password = edits.password;
     }
  
     update(value:any){

   if(value.password == ""){
    alert('put the new password!');
   }else{
    update(ref(this.database, 'users/' + value.email), {
      password: value.password
    }); 
    this.email = "";
    this.password = "";
   alert('User updated!');
     
   }
    }
}