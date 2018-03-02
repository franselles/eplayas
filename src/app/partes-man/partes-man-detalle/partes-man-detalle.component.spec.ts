import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartesManDetalleComponent } from './partes-man-detalle.component';

describe('PartesManDetalleComponent', () => {
  let component: PartesManDetalleComponent;
  let fixture: ComponentFixture<PartesManDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartesManDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartesManDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
