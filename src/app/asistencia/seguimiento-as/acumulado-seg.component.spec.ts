import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcumuladoSegComponent } from './acumulado-seg.component';

describe('AcumuladoSegComponent', () => {
  let component: AcumuladoSegComponent;
  let fixture: ComponentFixture<AcumuladoSegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcumuladoSegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcumuladoSegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
