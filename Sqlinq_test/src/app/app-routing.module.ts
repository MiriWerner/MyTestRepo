import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoComponent } from './info/info.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '',redirectTo:'/login',pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'info', component: InfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
