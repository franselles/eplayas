import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlAsComponent } from './control-as.component';

describe('ControlAsComponent', () => {
  let component: ControlAsComponent;
  let fixture: ComponentFixture<ControlAsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlAsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
