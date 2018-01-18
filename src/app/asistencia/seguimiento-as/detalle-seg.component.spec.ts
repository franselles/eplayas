import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSegComponent } from './detalle-seg.component';

describe('DetalleSegComponent', () => {
  let component: DetalleSegComponent;
  let fixture: ComponentFixture<DetalleSegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleSegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
