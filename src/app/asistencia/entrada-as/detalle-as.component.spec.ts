import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAsComponent } from './detalle-as.component';

describe('DetalleAsComponent', () => {
  let component: DetalleAsComponent;
  let fixture: ComponentFixture<DetalleAsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleAsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
