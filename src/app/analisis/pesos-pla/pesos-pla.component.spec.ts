import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesosPlaComponent } from './pesos-pla.component';

describe('PesosPlaComponent', () => {
  let component: PesosPlaComponent;
  let fixture: ComponentFixture<PesosPlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesosPlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesosPlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
