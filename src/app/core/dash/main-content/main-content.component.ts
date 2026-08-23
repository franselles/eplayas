import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-main-content',
    templateUrl: './main-content.component.html',
    styleUrls: ['./main-content.component.css'],
    imports: [RouterOutlet]
})
export class MainContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
