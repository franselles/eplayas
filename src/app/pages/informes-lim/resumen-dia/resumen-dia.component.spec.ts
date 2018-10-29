import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenDiaComponent } from './resumen-dia.component';

describe('ResumenDiaComponent', () => {
  let component: ResumenDiaComponent;
  let fixture: ComponentFixture<ResumenDiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenDiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
