import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HamacasComponent } from './hamacas.component';

describe('HamacasComponent', () => {
  let component: HamacasComponent;
  let fixture: ComponentFixture<HamacasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HamacasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HamacasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
