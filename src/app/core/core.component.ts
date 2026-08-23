import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-core',
    templateUrl: './core.component.html',
    styleUrls: ['./core.component.css'],
    imports: [RouterOutlet]
})
export class CoreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
