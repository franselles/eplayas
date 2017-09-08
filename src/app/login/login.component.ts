import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from './../shared/authentication.services';

import { IMessage } from 'ng2-semantic-ui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public errorPass: boolean;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
  }

  public dismiss(message: IMessage) {
    message.dismiss();
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      // email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(user: any) {
    const result = this.authenticationService.login(user.value);
    if (result === true) {
      this.router.navigate(['dash']);
    } else {
      this.errorPass = true;
    }
  }
}
