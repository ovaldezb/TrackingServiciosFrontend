import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidainventarioComponent } from './salidainventario.component';

describe('SalidainventarioComponent', () => {
  let component: SalidainventarioComponent;
  let fixture: ComponentFixture<SalidainventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalidainventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidainventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
