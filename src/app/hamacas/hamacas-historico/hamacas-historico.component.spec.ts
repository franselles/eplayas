import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HamacasHistoricoComponent } from './hamacas-historico.component';

describe('HamacasHistoricoComponent', () => {
  let component: HamacasHistoricoComponent;
  let fixture: ComponentFixture<HamacasHistoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HamacasHistoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HamacasHistoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
