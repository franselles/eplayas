import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAcuComponent } from './detalle-acu.component';

describe('DetalleAcuComponent', () => {
  let component: DetalleAcuComponent;
  let fixture: ComponentFixture<DetalleAcuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAcuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAcuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
