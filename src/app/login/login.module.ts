import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.services';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';

import { SuiMessageModule } from 'ng2-semantic-ui';

const routes: Routes = [
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SuiMessageModule
  ],
  declarations: [LoginComponent],
  providers: [ AuthenticationService ]
})
export class LoginModule { }
