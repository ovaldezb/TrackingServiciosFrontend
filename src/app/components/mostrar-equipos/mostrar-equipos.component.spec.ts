import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarEquiposComponent } from './mostrar-equipos.component';

describe('MostrarEquiposComponent', () => {
  let component: MostrarEquiposComponent;
  let fixture: ComponentFixture<MostrarEquiposComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarEquiposComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
