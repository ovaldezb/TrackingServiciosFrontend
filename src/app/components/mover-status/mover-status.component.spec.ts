import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoverStatusComponent } from './mover-status.component';

describe('MoverStatusComponent', () => {
  let component: MoverStatusComponent;
  let fixture: ComponentFixture<MoverStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoverStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoverStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
