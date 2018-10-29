import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperariosDetalleComponent } from './operarios-detalle.component';

describe('OperariosDetalleComponent', () => {
  let component: OperariosDetalleComponent;
  let fixture: ComponentFixture<OperariosDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperariosDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperariosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
