import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartesLimDetalleComponent } from './partes-lim-detalle.component';

describe('PartesLimDetalleComponent', () => {
  let component: PartesLimDetalleComponent;
  let fixture: ComponentFixture<PartesLimDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartesLimDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartesLimDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
