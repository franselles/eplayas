import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartesManListaComponent } from './partes-man-lista.component';

describe('PartesManListaComponent', () => {
  let component: PartesManListaComponent;
  let fixture: ComponentFixture<PartesManListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartesManListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartesManListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
