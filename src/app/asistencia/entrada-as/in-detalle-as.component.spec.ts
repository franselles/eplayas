import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InDetalleAsComponent } from './in-detalle-as.component';

describe('InDetalleAsComponent', () => {
  let component: InDetalleAsComponent;
  let fixture: ComponentFixture<InDetalleAsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InDetalleAsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InDetalleAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
