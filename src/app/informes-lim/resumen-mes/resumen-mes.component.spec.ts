import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenMesComponent } from './resumen-mes.component';

describe('ResumenMesComponent', () => {
  let component: ResumenMesComponent;
  let fixture: ComponentFixture<ResumenMesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenMesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenMesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
