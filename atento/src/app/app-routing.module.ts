import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './post/post.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
{path: 'login', component: LoginComponent},
{path: 'post', component: PostComponent},
{path: 'register', component: RegisterComponent},
{path: '',redirectTo: 'register', pathMatch: 'full'},
{path: 'homepage', component: HomepageComponent},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const root = [
  RegisterComponent,LoginComponent,HomepageComponent
  
]
