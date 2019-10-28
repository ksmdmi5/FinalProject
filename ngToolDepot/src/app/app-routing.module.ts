import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { ToolTransactionComponent } from './components/tool-transaction/tool-transaction.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { ToolComponent } from './components/tool/tool.component';
import { SkillComponent } from './components/skill/skill.component';
import { SkillTransactionComponent } from './components/skill-transaction/skill-transaction.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user', component: UserComponent },
  { path: 'toolTransaction/:id', component: ToolTransactionComponent },
  { path: 'toolTransaction', component: ToolTransactionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'tool', component: ToolComponent },
  { path: 'skill', component: SkillComponent },
  { path: 'skillTransaction', component: SkillTransactionComponent },
  { path: 'confirmation/:id', component: ConfirmationComponent},
  { path: 'confirmation', component: ConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
