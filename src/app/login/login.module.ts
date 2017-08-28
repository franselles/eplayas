import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.services';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';

import { AlertModule } from 'ngx-bootstrap';

const routes: Routes = [
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  providers: [ AuthenticationService ]
})
export class LoginModule { }
