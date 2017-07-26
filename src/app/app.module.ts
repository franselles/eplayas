import { CoreModule } from './core/core.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreComponent } from 'app/core/core.component';

@NgModule({
  declarations: [
      ],
  imports: [
    BrowserModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [CoreComponent]
})
export class AppModule { }
