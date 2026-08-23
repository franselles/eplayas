import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-control-as',
    templateUrl: './control-as.component.html',
    styleUrls: ['./control-as.component.css'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [RouterOutlet]
})
export class ControlAsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
