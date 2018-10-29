import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HamacasDetalleComponent } from './hamacas-detalle.component';

describe('HamacasDetalleComponent', () => {
  let component: HamacasDetalleComponent;
  let fixture: ComponentFixture<HamacasDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HamacasDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HamacasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
