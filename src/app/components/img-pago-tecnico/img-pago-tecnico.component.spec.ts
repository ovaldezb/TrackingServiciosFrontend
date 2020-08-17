import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPagoTecnicoComponent } from './img-pago-tecnico.component';

describe('ImgPagoTecnicoComponent', () => {
  let component: ImgPagoTecnicoComponent;
  let fixture: ComponentFixture<ImgPagoTecnicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgPagoTecnicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgPagoTecnicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
