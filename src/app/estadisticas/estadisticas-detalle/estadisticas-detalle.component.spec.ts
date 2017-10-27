import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasDetalleComponent } from './estadisticas-detalle.component';

describe('EstadisticasDetalleComponent', () => {
  let component: EstadisticasDetalleComponent;
  let fixture: ComponentFixture<EstadisticasDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
