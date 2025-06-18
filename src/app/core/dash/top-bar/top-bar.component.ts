import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './../../../shared/authentication.services';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css'],
    imports: [RouterLink, RouterLinkActive]
})
export class TopBarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  logOut() {
    this.authenticationService.logout();
  }

}
