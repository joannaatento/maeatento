import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {  AngularFireDatabase } from '@angular/fire/compat/database';
import { Database,remove,ref,update, onValue, set} from '@angular/fire/database';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  users!: Observable<any[]>;
  constructor(public database: Database, private FireDb: AngularFireDatabase) {
  this.users = FireDb.list('/post').valueChanges();}

  ngOnInit(): void {
  }

name =  sessionStorage.getItem('id');

post = "";
postid = "";
    posts(value:any){
      this.postid = "post" +Math.floor(100000 + Math.random() * 900000);
      set(ref(this.database, 'post/' + this.postid), {   
          name: value.name,
          post: value.post
   
         }); 
         alert('Posted!');

        this.post = "";
        }
        del(value: any){
          remove(ref(this.database, 'users/' + value));
          alert('Deleted Successfully')
        }
       }