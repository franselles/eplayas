import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcumuladoAsComponent } from './acumulado-as.component';

describe('AcumuladoAsComponent', () => {
  let component: AcumuladoAsComponent;
  let fixture: ComponentFixture<AcumuladoAsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcumuladoAsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcumuladoAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
