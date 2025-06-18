import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-partes-lim',
    templateUrl: './partes-lim.component.html',
    styleUrls: ['./partes-lim.component.css'],
    imports: [RouterLink, RouterOutlet]
})
export class PartesLimComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
