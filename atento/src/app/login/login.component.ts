import { Component, OnInit} from '@angular/core';
import { Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Database, ref, update,onValue, remove} from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  users!: Observable<any[]>;
  constructor(public auth: Auth,public database: Database, private db: AngularFireDatabase,private router:Router) {
    this.users = db.list('/users').valueChanges();
   }
   
  ngOnInit(): void {


  }

  loginUser(value: any) {

    //login 
       signInWithEmailAndPassword(this.auth, value.email, value.password)
        .then((userCredential) => {
      
         const user = userCredential.user;

         alert('user login');
          const date = new Date();
          update(ref(this.database, 'users/' + user.uid), {

         last_login: date
       });

       this.router.navigate(['/signup'])
      
  },err=>{
     alert(err.message)
  
   })
      
    .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
    });

    //read user

    //  const starCountRef = ref(this.database, 'users/' + value.email);
     // onValue(starCountRef, (snapshot) => {
      //const data = snapshot.val();
   
     // alert(data.email);
   
      //update user

//update(ref(this.database, 'users/' + value.email), {
//password: value.password
//});
//alert('password updated!');

//remove user

//remove(ref(this.database, 'users/' + value.email));
//alert('Successfully Removed');


  }

  
}
