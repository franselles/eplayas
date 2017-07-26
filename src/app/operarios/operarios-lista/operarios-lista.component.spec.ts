import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperariosListaComponent } from './operarios-lista.component';

describe('OperariosListaComponent', () => {
  let component: OperariosListaComponent;
  let fixture: ComponentFixture<OperariosListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperariosListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperariosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
