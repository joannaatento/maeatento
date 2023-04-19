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
  name =  sessionStorage.getItem('id');
  data = "";
  names = "";
  sent = true;
  comid="";
  currentpost=""
  currentcomment="";
  comment=false;
  replys=false;

  users!: Observable<any[]>;
  comments!: Observable<any[]>;
  reply!: Observable<any[]>;

  constructor(public database: Database, private FireDb: AngularFireDatabase) {
  this.users = FireDb.list('/post').valueChanges();

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



post = "";
uid = "";
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

        del(value: any){
          remove(ref(this.database, 'post/' + value));
          alert('Deleted Successfully')
        }
        logout(){
          sessionStorage.clear();
        }

        //comment function

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
        getComment(post:any){
          this.comments = this.FireDb.list('/post/'+post+'/comment/').valueChanges();
          this.currentpost=post;
       }
        delcomment(value: any){
            remove(ref(this.database, '/post/'+this.currentpost+'/comsec/'+ value));
           alert('Deleted Successfully')
        }

        //reply function
        rep(reply:any){
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
             this.replys=false;
        }
        getReply(reply:any){
          this.reply = this.FireDb.list('/post/'+this.currentpost+'/comment/ '+reply+'/reply/').valueChanges();
   
          this.currentcomment=reply  
          this.replys=true;
          this.comment=false;
         
      }
      delreply(value: any){
        remove(ref(this.database, '/post/'+this.currentpost+'/comment/ '+ this.currentcomment+'/reply/'+ value));
        alert('Deleted Successfully')
    }

      
       }

       