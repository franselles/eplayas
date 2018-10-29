import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasListaComponent } from './estadisticas-lista.component';

describe('EstadisticasListaComponent', () => {
  let component: EstadisticasListaComponent;
  let fixture: ComponentFixture<EstadisticasListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
