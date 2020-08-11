import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgRegresoComponent } from './img-regreso.component';

describe('ImgRegresoComponent', () => {
  let component: ImgRegresoComponent;
  let fixture: ComponentFixture<ImgRegresoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgRegresoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgRegresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
