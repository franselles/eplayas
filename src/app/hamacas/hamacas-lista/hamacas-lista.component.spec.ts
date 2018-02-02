import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HamacasListaComponent } from './hamacas-lista.component';

describe('HamacasListaComponent', () => {
  let component: HamacasListaComponent;
  let fixture: ComponentFixture<HamacasListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HamacasListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HamacasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
