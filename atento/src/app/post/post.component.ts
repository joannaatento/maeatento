import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import {  AngularFireDatabase} from '@angular/fire/compat/database';
import { Database,remove,ref,update, onValue, set, get} from '@angular/fire/database';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  name =  sessionStorage.getItem('id');
  post = "";
  uid = "";
  data = "";
  names = "";
  sent = true;
  comid="";
  currentpost=""
  currentcomment="";
  comment=false;
  replies=false;
  users!: Observable<any[]>;
  comments!: Observable<any[]>;
  reply!: Observable<any[]>;
  likesCount: number = 0;


  constructor(public database: Database, private FireDb: AngularFireDatabase) {
  this.users = FireDb.list('/post').valueChanges();
  this.name = sessionStorage.getItem('id');

  const starCountRef = ref(this.database, 'users/' + this.names);
    onValue(starCountRef, (snapshot) => {
    const db = snapshot.val();  
    this.names = db.names;

});

if(this.names != ""){
this.sent = true;
}else if(this.names == ""){
  this.sent = false;
  }

}

  ngOnInit(): void {
  
  }
      
//for posting
posted(value:any){
    this.uid = "post" + Math.floor(100000 + Math.random() * 900000);
    set(ref(this.database, 'post/' + this.uid), {   
        names: value.names,
        post: value.post,
        id: this.uid
   
 }); 
    alert('Posted!');
    this.post = "";
 }

//delete post
    del(value: any){
    remove(ref(this.database, 'post/' + value));
    alert('Deleted Successfully')
    }

//logout account
    logout(){
    sessionStorage.clear();
        }

//for commenting
  comm(value: any){
      this.comid = "comment" +Math.floor(100000 + Math.random() * 900000);
      set(ref(this.database, 'post/'+value.id+'/comment/ '+ this.comid), {   
      name: value.name,
      comment: value.post,
      id: this.comid,
      postid: value.id,       
 }); 
      alert('Successfully Commented!');
      this.post = "";

  }
      
//displaying comments
  getComment(post:any){
    this.comments = this.FireDb.list('/post/'+post+'/comment/').valueChanges();
    this.currentpost=post;
  }

//deleting comments
      delcomment(value: any){
      remove(ref(this.database, '/post/'+this.currentpost+'/comment/ '+value));
      alert('Deleted Successfully')
    }

//for reply
    replycom(reply:any){
          this.comid = "reply" +Math.floor(100000 + Math.random() * 900000);
          set(ref(this.database, 'post/'+this.currentpost+'/comment/ '+this.currentcomment+'/reply/'+ this.comid), {   
              name: reply.name,
              reply: reply.post,
              id: this.comid,
              postid: this.currentpost,
              commentid: this.currentcomment,         
  }); 
             alert('Reply Sent');
             this.post = "";
             this.comment=true;
             this.replies=false;
  }

//display replies
      getReply(reply:any){
          this.reply = this.FireDb.list('/post/'+this.currentpost+'/comment/ '+reply+'/reply/').valueChanges();
          this.currentcomment=reply  
          this.replies=true;
          this.comment=false;
         
  }

//delete replies
      delreply(value: any){
        remove(ref(this.database, '/post/'+this.currentpost+'/comment/ '+ this.currentcomment+'/reply/'+ value));
        alert('Deleted Successfully')
  }
  
  //like function
  like(userss: any) {
    let likes = userss.likes?.value || 0;
    let likedBy = userss.likes?.likedBy || [];
  
    if (!likedBy.includes(this.name)) {
      likes++;
      likedBy.push(this.name);
  
      set(ref(this.database, 'post/' + userss.id + '/likes/value'), likes);
      set(ref(this.database, 'post/' + userss.id + '/likes/likedBy'), likedBy);
  
      this.likesCount = likes;
    }
  }
  
  //unlike function
  unlike(userss: any) {
    let likes = userss.likes?.value || 0;
    let likedBy = userss.likes?.likedBy || [];

    if (likedBy.includes(this.name)) {
      likes--;
      likedBy = likedBy.filter((name: string) => name !== this.name);
  
      set(ref(this.database, 'post/' + userss.id + '/likes/value'), likes);
      set(ref(this.database, 'post/' + userss.id + '/likes/likedBy'), likedBy);
  
      this.likesCount = likes;
    }
  }
  
}   