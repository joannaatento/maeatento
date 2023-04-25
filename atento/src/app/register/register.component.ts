import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';
import { from } from 'rxjs';
import { Database, set, ref, update, onValue } from '@angular/fire/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  
  constructor( public database:Database,private router:Router)  { }
  ngOnInit(): void {}


  uid = "";
  multiple = "";
  
    registerUser(value:any){
  
      const starCountRef = ref(this.database, 'users/' + value.email);
      onValue(starCountRef, (snapshot) => {
       const dbase = snapshot.val();  
     this.multiple = dbase.email
   
       }); 
    
        
       if (  value.email == null || value.email == "" || value.password == null || value.password == "" 
        ||  value.username == null || value.username == "" 
        ){
         
        alert('Fill the form ');
       }else{
        if(this.multiple == value.email){
         alert('user email already exist!'); 
        }
    
          
        else {

          this.uid = "user" +Math.floor(100000 + Math.random() * 900000);
            set(ref(this.database, 'users/' + value.email), {
          id: this.uid,
          username: value.username,
          email: value.email,
          password: value.password,
      
    
    
  
       }); 
       alert('account created!');
       this.router.navigate(['/login'])
      }
     }
  }
}
