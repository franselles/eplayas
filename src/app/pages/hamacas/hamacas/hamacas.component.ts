import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-hamacas',
    templateUrl: './hamacas.component.html',
    styleUrls: ['./hamacas.component.css'],
    imports: [RouterOutlet]
})
export class HamacasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
