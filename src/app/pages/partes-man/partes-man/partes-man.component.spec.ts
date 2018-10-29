import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartesManComponent } from './partes-man.component';

describe('PartesManComponent', () => {
  let component: PartesManComponent;
  let fixture: ComponentFixture<PartesManComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartesManComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartesManComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
