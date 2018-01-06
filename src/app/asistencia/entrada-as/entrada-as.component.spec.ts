import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaAsComponent } from './entrada-as.component';

describe('EntradaAsComponent', () => {
  let component: EntradaAsComponent;
  let fixture: ComponentFixture<EntradaAsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntradaAsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntradaAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
