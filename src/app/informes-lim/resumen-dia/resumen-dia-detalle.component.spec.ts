import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenDiaDetalleComponent } from './resumen-dia-detalle.component';

describe('ResumenDiaDetalleComponent', () => {
  let component: ResumenDiaDetalleComponent;
  let fixture: ComponentFixture<ResumenDiaDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenDiaDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenDiaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
