import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MainContentComponent } from './main-content/main-content.component';

@Component({
    selector: 'app-dash',
    templateUrl: './dash.component.html',
    styleUrls: ['./dash.component.css'],
    imports: [TopBarComponent, MainContentComponent]
})
export class DashComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
