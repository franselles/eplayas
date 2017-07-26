import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartesLimComponent } from './partes-lim.component';

describe('PartesLimComponent', () => {
  let component: PartesLimComponent;
  let fixture: ComponentFixture<PartesLimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartesLimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartesLimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
