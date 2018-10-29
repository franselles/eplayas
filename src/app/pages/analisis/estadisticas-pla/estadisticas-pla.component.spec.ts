import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasPlaComponent } from './estadisticas-pla.component';

describe('EstadisticasPlaComponent', () => {
  let component: EstadisticasPlaComponent;
  let fixture: ComponentFixture<EstadisticasPlaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasPlaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasPlaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
