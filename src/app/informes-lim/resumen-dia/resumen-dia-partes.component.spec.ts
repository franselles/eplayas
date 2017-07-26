import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenDiaPartesComponent } from './resumen-dia-partes.component';

describe('ResumenDiaPartesComponent', () => {
  let component: ResumenDiaPartesComponent;
  let fixture: ComponentFixture<ResumenDiaPartesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenDiaPartesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenDiaPartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
