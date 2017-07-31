import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasMunComponent } from './estadisticas-mun.component';

describe('EstadisticasMunComponent', () => {
  let component: EstadisticasMunComponent;
  let fixture: ComponentFixture<EstadisticasMunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasMunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasMunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
