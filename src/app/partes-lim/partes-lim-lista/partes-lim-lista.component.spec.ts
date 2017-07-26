import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartesLimListaComponent } from './partes-lim-lista.component';

describe('PartesLimListaComponent', () => {
  let component: PartesLimListaComponent;
  let fixture: ComponentFixture<PartesLimListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartesLimListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartesLimListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
