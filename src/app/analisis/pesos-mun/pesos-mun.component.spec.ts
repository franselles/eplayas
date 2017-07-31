import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesosMunComponent } from './pesos-mun.component';

describe('PesosMunComponent', () => {
  let component: PesosMunComponent;
  let fixture: ComponentFixture<PesosMunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesosMunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesosMunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
