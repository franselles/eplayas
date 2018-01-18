import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoAsComponent } from './seguimiento-as.component';

describe('SeguimientoAsComponent', () => {
  let component: SeguimientoAsComponent;
  let fixture: ComponentFixture<SeguimientoAsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimientoAsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
